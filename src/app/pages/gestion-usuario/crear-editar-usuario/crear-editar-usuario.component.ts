import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/auth/interfaces/auth-interface';

@Component({
  selector: 'app-crear-editar-usuario',
  templateUrl: './crear-editar-usuario.component.html',
  styleUrls: ['./crear-editar-usuario.component.scss']
})
export class CrearEditarUsuarioComponent implements OnInit {
  formUsuario!: FormGroup;
  listadoSeleccionado: any;
  error: string = '';
  
  emailValidate: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  numbers: string = "^((\\+593-?)|0)?[0-9]{9}$";
  nombreValidTilde: string = "^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";

  constructor(
    private _authSer: AuthService,
    private router: Router,
    private fb: FormBuilder,

    public dialog: MatDialogRef<CrearEditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,

  ) { }

  ngOnInit(): void {
    this.initFormUsuario();
    this.chageUsuario();
  }

  initFormUsuario() {
    this.formUsuario = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],//usuario
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailValidate)]],
      cedula: ['', [Validators.required]],
      nombres: ['', [Validators.required, Validators.pattern(this.nombreValidTilde), Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.pattern(this.nombreValidTilde), Validators.minLength(3)]],
      num_celular: ['', [Validators.required, Validators.pattern(this.numbers), Validators.minLength(10), Validators.maxLength(10)]],
      direccion: [''],
      imagen: [''],
    });
  }

  chageUsuario(){
    if (this.data != null) {
      this.listadoSeleccionado = this.data;

      const { name , email, cedula , nombres, apellidos, num_celular, direccion} = {
        name : this.data.name,
        email : this.data.email,
        cedula : this.data.persona.cedula,
        nombres : this.data.persona.nombres,
        apellidos : this.data.persona.apellidos,
        num_celular : this.data.persona.num_celular,
        direccion : this.data.persona.direccion
      };

      this.formUsuario.patchValue( { name , email, cedula , nombres, apellidos, num_celular, direccion} );
    }

  }

  updateSaveUsuario() {
    this.formUsuario.markAllAsTouched()
    if (this.formUsuario.invalid) { return; }

    if (this.listadoSeleccionado ) {//editar
      let data: User = { ...this.formUsuario.value, id: this.listadoSeleccionado.id }
      console.log('update', data);
    }else {//crear
      const form = this.formUsuario.value;
      console.log('save', form);
    }
  }

  close() {
    this.dialog.close();
  }

  fieldsValidate(campo: string) {
    return this.formUsuario.get(campo)?.invalid && this.formUsuario.get(campo)?.touched;
  }

  errorHandling(campo: string): string {
    const errors = this.formUsuario.controls[campo]?.errors;
    if (errors?.['required']) {
      return  this.error = `El ${campo} es requerido`;
    }else if (errors?.['pattern']) {
      return this.error = `El ${campo} no tiene formato correcto`;
    }else if(errors?.['minlength'] && campo == 'nombres' || campo == 'apellidos' ||campo == 'name'  ){
      return this.error = `El ${campo} deber tener mínimo 3 caracteres`;
    }else if(errors?.['minlength'] && campo == 'num_celular'){
      return this.error = `El ${campo} deber tener mínimo 10 caracteres`;
    }
    return this.error;
  }
}
