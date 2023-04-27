import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {

  listaUrl : any [] = [];

  constructor(
    private activedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.listaUrl = this.activedRoute.snapshot.url;  

  }

}
