import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  @ViewChild('me') me!:ElementRef<HTMLElement>;

  constructor(
    private renderer : Renderer2
  ) { }

  user: any[] = [

    {
      user: [
        {
          id: 1,
          usuario: "CarlossRreyes98",
          nombres: "Carloss Rreyes",
          apellidos: "Ricardo Reyes" ,      

        }
    

      ],
      rol: [
        {
          id: 1, 
          cargo: "Administrador",
          estado: "A"

        }
      ]
    }

  ];

  menu : any [] = [
    {
      id: 1,
      nombre : 'Dashboard',
      url : 'dashboard',
      icono : 'bi bi-grid',
      menu_hijo : []
    },
    {
      id: 2,
      nombre : 'Departamento',
      url : 'departamento',
      icono : 'bi bi-bar-chart',
      menu_hijo : [
        {
          sub_menu : 'Nuevo Departamento',
          url : 'nuevo-departamento',
          icono : 'bi bi-circle',
        },
        {
          sub_menu : 'Eliminar Departamento',
          url : 'eliminar-departamento',
          icono : 'bi bi-circle',
        },
      ]
    },
    {
      id: 3,
      nombre : 'Departamento 2',
      url : 'departamento',
      icono : 'bi bi-bar-chart',
      menu_hijo : [
        {
          sub_menu : 'Nuevo Departamento 2',
          url : 'nuevo-departamento',
          icono : 'bi bi-circle',
        },
        {
          sub_menu : 'Eliminar Departamento 2',
          url : 'eliminar-departamento',
          icono : 'bi bi-circle',
        },
      ]
    }
  ];



  ngOnInit(): void {
  }

  openCloseMenu(){    
    const m = this.me.nativeElement.classList.contains('m');
    let ele = this.me.nativeElement;

    if (m) {
      this.addClass(ele, 'toggle-sidebar');
      this.removeClass(ele, 'm');
    } else {
      this.removeClass(ele, 'toggle-sidebar');
      this.addClass(ele, 'm');
    }
  }


  addClass(ele: HTMLElement, name: string){
    this.renderer.addClass(ele,name);
  }

  removeClass(ele: HTMLElement, name: string){
    this.renderer.removeClass(ele,name);
  }

}
