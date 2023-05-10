import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Evento } from '../interfaces/evento.interface';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.scss']
})
export class CrearEventoComponent implements OnInit {
  error: string = '';
  listadoSeleccionado: any;
  formEvento!: FormGroup;
  hide : boolean = true;
  @Inject(MAT_DIALOG_DATA) public data!: Evento;
  constructor(private fb: FormBuilder,public dialog: MatDialogRef<CrearEventoComponent>) { }

  ngOnInit(): void {
   // this.initFormEvento();
    //this.setEvento();
  }

  initFormEvento() {
    // this.formEvento = this.fb.group({
    //   nombre: ['', [Validators.required, Validators.minLength(3)]],
    //   fecha: ['', [Validators.required]],
    // });

  }

  setEvento(){
    // if (this.data != null) {
    //   this.listadoSeleccionado = this.data;
    //   const { nombre, fecha} = this.data;
    //   const data = {nombre,fecha};
    //   //setear el formulario
    //   this.formEvento.patchValue(data);
    // }
  }

  fieldsValidate(campo: string) {
    return this.formEvento.get(campo)?.invalid && this.formEvento.get(campo)?.touched;
  }

  updateSaveEvento(){
  // this.formEvento.markAllAsTouched();
  // if (this.formEvento.invalid) { return; }

  //   if (this.listadoSeleccionado) {//editar
     
  //   }else 
  //   {//crear
     
  //   }
  }

  registrarEvento(data:Evento){

  }
  addObjeto(form: Evento){
    // let eventos : Evento = {
    //   nombre: form.nombre,
    //   fecha: form.fecha,
    //   estado: form.estado
    // };
    // if (form.id) {//actualizar
   
    // }
  }

  close() {
    this.dialog.close();
  }
}

