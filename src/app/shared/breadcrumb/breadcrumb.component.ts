import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() listaUrl : any [] = [];
  titulo : string = '';
  newListaUrl : any [] = [];

  constructor() { }

  ngOnInit(): void {

    this.titulo = this.listaUrl[0].path.replace('-',' ') || '';

    this.listaUrl.forEach( (item) => { this.newListaUrl.push( item.path.replace('-', ' ')) })
    
  }

}
