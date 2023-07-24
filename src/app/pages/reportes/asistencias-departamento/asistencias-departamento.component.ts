import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntUrlActivate } from '@app/pages/gestion-usuario/interfaces/urlActivatedRoute.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AsistDeparService } from '../services/asist-depar.service';
import { UsuarioService } from '@app/pages/gestion-usuario/usuario.service';

import { MatTableDataSource } from '@angular/material/table';

import { PdfMakeWrapper, Table, Txt , Img, Cell, Columns , Stack, } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; 

@Component({
  selector: 'app-asistencias-departamento',
  templateUrl: './asistencias-departamento.component.html',
  styleUrls: ['./asistencias-departamento.component.scss']
})
export class AsistenciasDepartamentoComponent implements OnInit {
  listaUrl: IntUrlActivate[] = [];

  listaUsuarios: any[] = [];

  asistenciaXdepartamento: any[] = [];

  name_type: any = '';

  dataSourceAsistenciaxDepartamentoResponse!: MatTableDataSource<any>;

  columnsToDisplayWithExpandUsersResponse: string[] = ['id','fecha','hora', 'tipo_asistencia', 'tipo_registro', 'asistencias_departamento'];

  formAD! : FormGroup;

  constructor(
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder,
    private user_service: UsuarioService,
    private asis_service : AsistDeparService

  ) { }

  ngOnInit(): void {
    this.listaUrl = this.rutaActiva.snapshot.url;
    this.initForm();
    this.getUserLista();


  }

  
  listData(ListasistenciaXdepartamento: any){
    this.asistenciaXdepartamento = [];
    this.asistenciaXdepartamento = ListasistenciaXdepartamento;
    for(let x of this.asistenciaXdepartamento){ x.tipo_asistencia.id == 1 ? this.name_type = "Departamento": this.name_type = "Nombre del evento";}
    this.dataSourceAsistenciaxDepartamentoResponse = new MatTableDataSource(this.asistenciaXdepartamento);
  }

  initForm(){
    this.formAD = this.fb.group({
      usuario_id: ['', [Validators.required]],
      fecha_inicio : ['',  [Validators.required]],
      fecha_fin : ['',  [Validators.required]],
      usuario: [''],
      fecha : [''],
      hora : [''],
      
    });
  }

  fieldsValidate(campo: string) {
    return this.formAD.get(campo)?.invalid && this.formAD.get(campo)?.touched;
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
  mostrarasistenciaEvento(lista: any[]){
    for(let item of lista){
      return item.evento.nombre;
    }
    //return "Hola"
  }
  mostrarAsistenciaDepartamento(lista: any[]){
    for(let item of lista){
      return item.departamento.nombre;
    }
    
  }
  exportarPdf(){

    console.log("Usuario activo: ", this.formAD.value.usuario_id)

    let us = this.listaUsuarios.find(u =>  u.id === this.formAD.value.usuario_id )
    console.log(us)
    const fechaE = new Date();

    PdfMakeWrapper.setFonts(pdfFonts);

    const tableHeader = [
      new Txt('N°').bold().alignment('center').fontSize(10) .end,
      new Txt('Fecha').bold().alignment('center').fontSize(10) .end,
      new Txt('Hora').bold().alignment('center').fontSize(10) .end,
      new Txt('Tipo asistencia').bold().alignment('center').fontSize(10) .end,
      new Txt('Tipo registro').bold().alignment('center').fontSize(10) .end,
      new Txt('Departamento/Evento').bold().alignment('center').fontSize(10) .end,

    ];
    let count = 1;

    const tableDataArray = this.asistenciaXdepartamento.map((item) => [
      //console.log(count++),
     
      new Txt(`${count++}` ).alignment('center').fontSize(10) .end,
      new Txt(this.toTitleCase(item.fecha) ).alignment('center').fontSize(10) .end,
      new Txt( this.toTitleCase(item.hora)).alignment('center').fontSize(10) .end,
      new Txt( this.toTitleCase(item.tipo_asistencia.type)).alignment('center').fontSize(10) .end,
      new Txt( this.toTitleCase(item.tipo_registro.tipo)).alignment('center').fontSize(10) .end,
      new Txt(
        //this.mostrarAsistenciaEvento()
        item.asistencias_departamento.length > 0 ? this.toTitleCase(this.mostrarAsistenciaDepartamento(item.asistencias_departamento)) : this.toTitleCase(this.mostrarasistenciaEvento(item.asistencia_evento))
        
      ).alignment('center').fontSize(10) .end,
     

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
          "Reporte de Asistencias por Departamento del Usuario"
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
            new Txt(`${this.formAD.value.fecha_inicio}`).alignment('left').fontSize(10) .end,
          ]).end,
          new Txt([
            new Txt('Reporte hasta:  ').fontSize(10).bold().end,
            new Txt(`${this.formAD.value.fecha_fin}`).alignment('left').fontSize(10) .end,
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
    const form = this.formAD.value;
    let usuario_id = parseInt(form.usuario_id);
    let f_inicio = form.fecha_inicio;
    let f_fin = form.fecha_fin;

    
    this.asis_service.consultaAsistenciaXDepartamento(f_inicio, f_fin, usuario_id ).subscribe({
      next: (resp) => {
        if(resp.status){
          console.log(resp.data);
          this.listData(resp.data.asistencias);
          console.log(resp.data.cabecera.usuario)
          this.formAD.get('usuario')?.setValue(resp.data.cabecera.usuario);
          const fecha = new Date();

          this.formAD.get('fecha')?.setValue(fecha);

        }
      },
      error: (err) => {
        console.log(err);
      }
    });


  }





}
