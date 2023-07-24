import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { IntUrlActivate } from '@app/pages/gestion-usuario/interfaces/urlActivatedRoute.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PuntualesAtrasadosService } from '../services/puntuales-atrasados.service';
import { UsuarioService } from '@app/pages/gestion-usuario/usuario.service';

import { MatTableDataSource } from '@angular/material/table';

import { PdfMakeWrapper, Table, Txt , Img, Cell, Columns , Stack, } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; 


@Component({
  selector: 'app-puntuales-atrasados',
  templateUrl: './puntuales-atrasados.component.html',
  styleUrls: ['./puntuales-atrasados.component.scss']
})
export class PuntualesAtrasadosComponent implements OnInit {

  listaUrl: IntUrlActivate[] = [];


  listAtrasadoPuntuales: any[] = [
/*     {
      type: 'S',
      name: 'Atrasado'      
    }, */
    {
      type: 'N',
      name: 'Puntuales',
    }
  ];
  

  listaPuntualesAtrasadosXasistencia: any[] = [];

  

  dataSourceAtrasadosPuntualesxAsistenciaResponse!: MatTableDataSource<any>;

  columnsToDisplayWithExpandUsersResponse: string[] = ['id', 'id_usuario', 'usuario', 'tipo', 'tipoAsistencia', 'fecha', 'hora'];

  formAP! : FormGroup;

  constructor(
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder,
    private user_service: UsuarioService,
    private pa_service : PuntualesAtrasadosService
  ) { }

  ngOnInit(): void {
    this.listaUrl = this.rutaActiva.snapshot.url;
    this.initForm();
  }

  fieldsValidate(campo: string) {
    return this.formAP.get(campo)?.invalid && this.formAP.get(campo)?.touched;
  }

  initForm(){
    this.formAP = this.fb.group({
      tipo_atrasado_asistencia: ['', [Validators.required]],
      fecha_inicio : ['',  [Validators.required]],
      fecha_fin : ['',  [Validators.required]],      
      fecha : [''],
      hora : [''],
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


    const fechaE = new Date();

    PdfMakeWrapper.setFonts(pdfFonts);

    const tableHeader = [
      new Txt('N°').bold().alignment('center').fontSize(10) .end,
      new Txt('Id.').bold().alignment('center').fontSize(10) .end,
      new Txt('Usuario').bold().alignment('center').fontSize(10) .end,
      new Txt('Tipo').bold().alignment('center').fontSize(10) .end,
      new Txt('Tipo de Asistencia').bold().alignment('center').fontSize(10) .end,
      new Txt('Fecha').bold().alignment('center').fontSize(10) .end,
      new Txt('Hora').bold().alignment('center').fontSize(10) .end,

    ];
    let count = 1;

    const tableDataArray = this.listaPuntualesAtrasadosXasistencia.map((item) => [
      //console.log(count++),
      new Txt(`${count++}` ).alignment('center').fontSize(10) .end,
      new Txt((item.user_id) ).alignment('center').fontSize(10) .end,
      new Txt( this.toTitleCase(item.usuarios)).alignment('center').fontSize(10) .end,
      new Txt( this.toTitleCase(item.tipo)).alignment('center').fontSize(10) .end,
      new Txt( this.toTitleCase(item.tipoAsistencia)).alignment('center').fontSize(10) .end,
      new Txt( this.toTitleCase(item.fecha)).alignment('center').fontSize(10) .end,
      new Txt( this.toTitleCase(item.hora)).alignment('center').fontSize(10) .end,

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
          "Reporte de puntuales y atrasados de usuarios"
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
            new Txt(`${this.formAP.value.fecha_inicio}`).alignment('left').fontSize(10) .end,
          ]).end,
          new Txt([
            new Txt('Reporte hasta:  ').fontSize(10).bold().end,
            new Txt(`${this.formAP.value.fecha_fin}`).alignment('left').fontSize(10) .end,
          ]).end,
          /*
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
          */
          
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
    const form = this.formAP.value;
    let type = form.tipo_atrasado_asistencia;
    let f_inicio = form.fecha_inicio;
    let f_fin = form.fecha_fin;

    console.log(type)

    this.pa_service.consultaPuntualesAtrasadosXasistencia(f_inicio, f_fin ).subscribe({
      next: (resp) => {
        if(resp.status){
          console.log(resp.data);
          this.listData(resp.data);
          const fecha = new Date();

          this.formAP.get('fecha')?.setValue(fecha);
          
          
        }
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  listData(puntualesAtrasadosXAsistencia: any){
    this.listaPuntualesAtrasadosXasistencia = [];
    this.listaPuntualesAtrasadosXasistencia = puntualesAtrasadosXAsistencia;
    this.dataSourceAtrasadosPuntualesxAsistenciaResponse = new MatTableDataSource(this.listaPuntualesAtrasadosXasistencia);
  }



}
