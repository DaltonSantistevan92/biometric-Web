import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  nombre_usuario: string = "";
  nombre_rol: string = "";




  constructor() { }

  ngOnInit(): void {


    this.nombre_usuario = "Carloss Rreyes";
    this.nombre_rol = "Administrador"



  }




}
