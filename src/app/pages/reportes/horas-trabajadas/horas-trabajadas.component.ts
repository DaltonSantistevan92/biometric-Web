import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { IntUrlActivate } from '@app/pages/gestion-usuario/interfaces/urlActivatedRoute.interface';
import { HorasTrabajadasService } from '../services/horas-trabajadas.service';
import { UsuarioService } from '@app/pages/gestion-usuario/usuario.service';

import { MatTableDataSource } from '@angular/material/table';

import { PdfMakeWrapper, Table, Txt , Img, Cell, Columns , Stack, } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; 


@Component({
  selector: 'app-horas-trabajadas',
  templateUrl: './horas-trabajadas.component.html',
  styleUrls: ['./horas-trabajadas.component.scss']
})
export class HorasTrabajadasComponent implements OnInit {

  formHT! : FormGroup;
  listaUrl: IntUrlActivate[] = [];

  listaUsuarios: any[] = [];

  listHorasTrabajadas: any[] = [];

  dataSourceHorasTrabajadasResponse!: MatTableDataSource<any>;

  columnsToDisplayWithExpandUsersResponse: string[] = ['id','fecha','horas_extras','horas_trabajadas','total_horas_trabajadas'];

  constructor(
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder,
    private horasTra_service: HorasTrabajadasService,
    private user_service: UsuarioService
  ) { }

  //3 parametros = use_id, fecha_ini, fecha_fin

  ngOnInit(): void {
    this.listaUrl = this.rutaActiva.snapshot.url;

    this.intForm();
    this.getUserLista();
  }


  intForm(){
    this.formHT = this.fb.group({
      usuario_id: ['', [Validators.required]],
      fecha_inicio : ['',  [Validators.required]],
      fecha_fin : ['',  [Validators.required]],
      fecha : [''],
      hora : [''],
    });
  }


  fieldsValidate(campo: string) {
    return this.formHT.get(campo)?.invalid && this.formHT.get(campo)?.touched;
  }

  getUserLista() {
    this.user_service.getUser().subscribe({
      next: (resp) => { 
        if (resp.data.length > 0) { this.listaUsuarios = resp.data}
      },
      error: (err) => {
        console.log(err);
      }
    });
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

    console.log("Usuario activo: ", this.formHT.value.usuario_id)

    let us = this.listaUsuarios.find(u =>  u.id === this.formHT.value.usuario_id )
    console.log(us)
    const fechaE = new Date();

    PdfMakeWrapper.setFonts(pdfFonts);

    const tableHeader = [
      new Txt('N°').bold().alignment('center').fontSize(10) .end,
      new Txt('Fecha').bold().alignment('center').fontSize(10) .end,
      new Txt('Horas extras').bold().alignment('center').fontSize(10) .end,
      new Txt('Horas trabajadas').bold().alignment('center').fontSize(10) .end,
      new Txt('Total horas trabajadas').bold().alignment('center').fontSize(10) .end,

    ];
    let count = 1;

    const tableDataArray = this.listHorasTrabajadas.map((item) => [
      //console.log(count++),
      new Txt(`${count++}` ).alignment('center').fontSize(10) .end,
      new Txt(this.toTitleCase(item.fecha) ).alignment('center').fontSize(10) .end,
      new Txt( this.toTitleCase(item.horas_extras)).alignment('center').fontSize(10) .end,
      new Txt( this.toTitleCase(item.horas_trabajadas)).alignment('center').fontSize(10) .end,
      new Txt( this.toTitleCase(item.total_horas_trabajadas)).alignment('center').fontSize(10) .end,

    ]);


    const pdf = new PdfMakeWrapper();

    try{

      pdf.add(
        new Stack([
          //new Img(imageBase64).build(),
          //new Img(imageBase64). ,
          new Txt('BIOMETRIC WEB').alignment('center').fontSize(14).bold() .end,
        
          new Txt('Sistema de Control de Asistencia').alignment('center').fontSize(14).bold() .end,
      ]).end
      );
   

      

      pdf.add(
        new Txt(
          "Reporte de Horas Trabajadas por Usuario"
        )
        .color("blue")
        .alignment('center')
        .fontSize(14)
        .bold()
        .margin(5)
        .end
      );

      pdf.add(
        new Stack([
          new Txt([
            new Txt('Reporte desde: ').fontSize(10).bold().end,
            new Txt(`${this.formHT.value.fecha_inicio}`).alignment('left').fontSize(10) .end,
          ]).end,
          new Txt([
            new Txt('Reporte hasta:  ').fontSize(10).bold().end,
            new Txt(`${this.formHT.value.fecha_fin}`).alignment('left').fontSize(10) .end,
          ]).end,
          new Txt([
            new Txt('Cedula: ').fontSize(10).bold().end,
            new Txt(`             ${us.persona.cedula}`).alignment('left').fontSize(10) .end,
     
          ]).end,
          new Txt([
            new Txt('Nombres:').fontSize(10).bold().end,
            new Txt(`           ${this.toTitleCase(us.persona.nombres)} ${ this.toTitleCase(us.persona.apellidos)} `).alignment('left').fontSize(10) .end,
     
          ]).end,
          new Txt([
           " "
     
          ]).margin(4).end,
          
        ])
        .margin(0)
        .end,

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

      pdf.add(
        new Columns([
          new Txt(`Fecha emisión: ${this.formatDateToYYYYMMDD(fechaE)}`).alignment('left').fontSize(10) .end,
          new Txt(`Hora emisión: ${this.formatTimeToHHMMSS(fechaE)}`).alignment('right').fontSize(10) .end,
          
      ]).columnGap(30)
      .margin(10)
      .end
      ); 
     
  
      
      pdf.create().open();


    }catch (error){
      console.error('Error al generar el PDF:', error);
    }

  }





  
  consultar(){

    let form = this.formHT.value;
    let usuario_id = parseInt(form.usuario_id);
    let fecha_inicio = form.fecha_inicio;
    let fecha_fin = form.fecha_fin;
    console.log(usuario_id)

    this.horasTra_service.consultarHorasTrabajadas(usuario_id, fecha_inicio, fecha_fin).subscribe({
      next: (resp) => {
        if(resp.length > 0){
          console.log(resp);
          this.listData(resp);
          const fecha = new Date();

          this.formHT.get('fecha')?.setValue(fecha);

        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  listData(horasTrabajadas: any){
    this.listHorasTrabajadas = [];
    this.listHorasTrabajadas = horasTrabajadas;
    this.dataSourceHorasTrabajadasResponse = new MatTableDataSource(this.listHorasTrabajadas);

/*     apellidos: "suarez"
​​
    fecha: "2023-06-28"
    ​​
    horas_extras: "00:00:00"
    ​​
    horas_trabajadas: "04:00:13"
    ​​
    nombres: "prueba"
    ​​
    total_horas_trabajadas: "04:00:13"
    ​​
    user_id: 19 */


  }





}
