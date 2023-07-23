import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserSinDeparService } from '@app/pages/asignacion-user-departamento/services/user-sin-depar.service';
import { IntUrlActivate } from '@app/pages/gestion-usuario/interfaces/urlActivatedRoute.interface';
import { EmpleDeparService } from '../services/emple-depar.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PdfMakeWrapper, Table, Txt , Img, Cell, Columns , Stack, } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; 

@Component({
  selector: 'app-empleados-departamento',
  templateUrl: './empleados-departamento.component.html',
  styleUrls: ['./empleados-departamento.component.scss']
})
export class EmpleadosDepartamentoComponent implements OnInit {
  listaUrl: IntUrlActivate[] = [];
  listaDepartamento : any [] = [];
  formRED! : FormGroup;

  name: any = "";

  //table
  columnsToDisplayWithExpandUsersResponse: string[] = ['id','empleado','cargo','sexo'];
  dataSourceUsersResponse!: MatTableDataSource<any>;
 
  @ViewChild('MatPaginatorUsersResponse') paginatorUsersResponse!: MatPaginator;
  @ViewChild(MatSort) sortUsersResponse!: MatSort;
  listaUsersResponse: any[] = [];

  constructor(
    private rutaActiva: ActivatedRoute,
    private _usd : UserSinDeparService,
    private fb: FormBuilder,
    private _eds: EmpleDeparService

  ) { }

  ngOnInit(): void {
    this.listaUrl = this.rutaActiva.snapshot.url;
    this.intForm();
    this.listarDepartamento();

    this.formRED.get('departamento_id')?.valueChanges.subscribe((departamento_id:number) =>{
      if (departamento_id != undefined) {
        this.consultar(departamento_id); 
      } else {
        this.listaUsersResponse = [];
      }
    })
  }

  toTitleCase(word: string): string {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  }

  formatDateToYYYYMMDD(date: Date): string {
    const isoString = date.toISOString();
    return isoString.substring(0, 10);
  }

  formatTimeToHHMMSS(date: Date): string {
    const ecuadorTimezoneOffset = -5; // Ecuador está en UTC-5
    const ecuadorTime = new Date(date.getTime() + ecuadorTimezoneOffset * 60 * 60 * 1000);
    const isoString = ecuadorTime.toISOString();
    return isoString.substring(11, 19);
  }

  exportarPdf(){
    const fechaE = new Date();

    PdfMakeWrapper.setFonts(pdfFonts);

    const tableHeader = [
      new Txt('N°').bold().alignment('center').fontSize(10) .end,
      new Txt('Empleado/a').bold().alignment('center').fontSize(10) .end,
      new Txt('Cargo').bold().alignment('center').fontSize(10) .end,
      new Txt('Sexo').bold().alignment('center').fontSize(10) .end,

    ];
    let count = 1;

    const tableDataArray = this.listaUsersResponse.map((item) => [
      //console.log(count++),
      new Txt(`${count++}` ).alignment('center').fontSize(10) .end,
      new Txt(this.toTitleCase(item.persona.nombres) ).alignment('center').fontSize(10) .end,
      new Txt( this.toTitleCase(item.rol.cargo)).alignment('center').fontSize(10) .end,
      new Txt( this.toTitleCase(item.persona.sexo.detalle)).alignment('center').fontSize(10) .end,

    ]);


    const pdf = new PdfMakeWrapper();

    try{

      pdf.add(
        new Stack([
          //new Img(imageBase64).build(),
          //new Img(imageBase64). ,
          new Txt('Biometric Web').alignment('center').fontSize(16).bold().color("blue") .end,
        
          new Txt('Sistema de Control de Asistencia').alignment('center').fontSize(16).bold().color("blue") .end,
      ]).end
      );
   

      pdf.add(
        new Columns([
          new Txt(`Fecha emisión: ${this.formatDateToYYYYMMDD(fechaE)}`).alignment('left').fontSize(10) .end,
          new Txt(`Hora emisión: ${this.formatTimeToHHMMSS(fechaE)}`).alignment('right').fontSize(10) .end,
          
      ]).columnGap(30)
      .margin(10)
      .end
      ); 

      pdf.add(
        new Txt(
          "Reporte de Empleados por Departamento"
        )
        .alignment('center')
        .fontSize(14)
        .bold()
        .margin(10)
        .end
      );
  
  
  
  
    
  
      pdf.add(
        new Table([
          tableHeader,
          ...tableDataArray
        ]).widths('*')
  
        .alignment('center')
        .layout({
        
          
          
          fillColor: (rowIndex) => {
            // row 0 is the header
            if (rowIndex === 0) {
              return '#B5B2B2';
            }
    
            return '#ffffff';
          },
          paddingLeft: (rowIndex) => {
            if(rowIndex === 0){
              return 0;
            }
  
            return 8
          }
          
        })
        //.widths([100, 150, '*', 100])
        .end
      ); 
     
  
      
      pdf.create().open();


    }catch (error){
      console.error('Error al generar el PDF:', error);
    }

  }

  intForm(){
    this.formRED = this.fb.group({
      departamento_id: ['', [Validators.required]],
      nombreDepartamento : [''],
      fecha : [''],
      hora : [''],

    });
  }

  consultar(departamento_id : number){
    this._eds.consultaEmpleadosXDepartamento(departamento_id).subscribe({
      next : (resp) => {
        if (resp.status) {
          this.datos(resp.data);

          const lista = this.listaDepartamento.find(ld => {
            if (ld.id === departamento_id) { return ld.nombre; }
          });
          this.formRED.get('nombreDepartamento')?.setValue(lista.nombre);
          const fecha = new Date();

          this.formRED.get('fecha')?.setValue(fecha);




        }
        
      },
      error : (err) => {
        console.log(err);
      }
    });
  }

  datos(users: any){
    this.listaUsersResponse = [];
    this.listaUsersResponse = users;
    this.dataSourceUsersResponse = new MatTableDataSource(this.listaUsersResponse);
    setTimeout(() => { this.assignPaginatorAndSort(); }, 1000);
  }

  private assignPaginatorAndSort() {
    this.dataSourceUsersResponse.paginator = this.paginatorUsersResponse;
    this.dataSourceUsersResponse.sort = this.sortUsersResponse;

    if (this.paginatorUsersResponse != undefined) {
      this.paginatorUsersResponse._intl.getRangeLabel = this.getRangeDisplayText;
      this.dataSourceUsersResponse.filterPredicate = this.filterBySubject();//filtra por objeto
    }
  }

  getRangeDisplayText = (page: number, pageSize: number, length: number) => {
    const initialText = `Mostrando Empleados`;
   
    if (length == 0 || pageSize == 0) {
      return `${initialText} 0 de ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${initialText} ${startIndex + 1} a ${endIndex} de ${length}`;
  };

  filterBySubject() {
    let filterFunction = (users: any, filter: string): boolean => {
      if (filter) {
        const subjectUser = users;  //para objecto
        const cliente = subjectUser.persona.nombres || '';
        const cargo = subjectUser.rol.cargo || '';
        const sexo = subjectUser.persona.sexo.detalle || '';
  
        return cliente.indexOf(filter) !== -1 || cargo.indexOf(filter) !== -1 || sexo.indexOf(filter) !== -1;
      } else {
        return true;
      }
    };  
    return filterFunction;
  }

  listarDepartamento(){
    this._usd.getDeparActive().subscribe({
      next : (resp) => {
        if (resp.status) {
          this.listaDepartamento = resp.data;
        }
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  applyFilterUsersResponse(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUsersResponse.filter = filterValue.trim().toLowerCase();
   
    if (this.dataSourceUsersResponse.paginator) {
      this.dataSourceUsersResponse.paginator.firstPage();
    }
  }

}
