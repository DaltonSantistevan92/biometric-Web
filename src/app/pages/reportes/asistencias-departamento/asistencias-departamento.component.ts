import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntUrlActivate } from '@app/pages/gestion-usuario/interfaces/urlActivatedRoute.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-asistencias-departamento',
  templateUrl: './asistencias-departamento.component.html',
  styleUrls: ['./asistencias-departamento.component.scss']
})
export class AsistenciasDepartamentoComponent implements OnInit {
  listaUrl: IntUrlActivate[] = [];

  formAD! : FormGroup;

  constructor(
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.listaUrl = this.rutaActiva.snapshot.url;

  }

  intForm(){
    this.formAD = this.fb.group({
      departamento_id: ['', [Validators.required]],
      nombreDepartamento : [''],
      fecha : [''],
      hora : [''],

    });
  }

}
