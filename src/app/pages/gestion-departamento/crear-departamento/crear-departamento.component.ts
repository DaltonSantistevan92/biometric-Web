import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departamento } from '../interfaces/departamento.interface';
import { DepartamentoserviceService } from '../departamentoservice.service';
import { GeneralService } from '@app/services/general.service';

@Component({
  selector: 'app-crear-departamento',
  templateUrl: './crear-departamento.component.html',
  styleUrls: ['./crear-departamento.component.scss']
})
export class CrearDepartamentoComponent implements OnInit {

  listadoSeleccionado: any;

  /**********FORM GROUP******** */
  formDepartamento!: FormGroup;

  constructor(
    public dialog: MatDialogRef<CrearDepartamentoComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Departamento,
    private serviceDep: DepartamentoserviceService,
    private _gs : GeneralService,

  ) { }

  ngOnInit(): void {
    this.initFormUsuario();
    this.setDepartamento();
  }

  initFormUsuario() {
    this.formDepartamento = this.fb.group({
      /*
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      */
      nombre: ['', [Validators.required, Validators.minLength(20)]],
      /*
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      num_celular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      rol_id: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      direccion: [''],
      imagen: [''],
      */
    });
  }

  updateSaveDepartamento(){
    this.formDepartamento.markAllAsTouched();
    if (this.formDepartamento.invalid) { return; }

    if (this.listadoSeleccionado) {//editar
      let data: Departamento = {
        ...this.formDepartamento.value,
        user_id: this.listadoSeleccionado.id,
        persona_id: this.listadoSeleccionado.persona.id,
      }

      
    } else {//crear
      /*
      const form: UserPersonEdSav = this.formDepartamento.value;
      const data = this.addObjeto(form);
      this.registrarUsuario(data);
      */
    }

  }

  actualizandoDepartamento(data: Departamento) {
    this.serviceDep.updateDepartament(data).subscribe({
      next: (resp) => {
        if (resp.status) {
          this.formDepartamento.reset();
          this._gs.alert(resp.message, '🚀', 'green');
        }
      },
      error: (err) => {
        this._gs.alert(err, '📛', 'red');
      },
    });
  }
  setDepartamento() {
    console.log("Data: ",this.data)
    if (this.data != null) {
      this.listadoSeleccionado = this.data;
      //this.serviceImagen(this.data.imagen);
      
      //desestructuracion de objecto
      //const { name, email, imagen, rol_id , persona : { cedula, nombres, apellidos ,num_celular, direccion }  } = this.data;
      const {  nombre, estado } = this.data;
      //unir las const de todo los objecto desestructurado
      const data = { nombre };
      
      //setear el formulario
      this.formDepartamento.patchValue(data);
    }
  }


  fieldsValidate(campo: string) {
    return this.formDepartamento.get(campo)?.invalid && this.formDepartamento.get(campo)?.touched;
  }

  close(){
    this.dialog.close();

  }





}
