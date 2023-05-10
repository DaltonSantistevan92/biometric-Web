import { Component, OnInit, ViewChild } from '@angular/core';
import { Departamento } from './interfaces/departamento.interface';
import { DepartamentoserviceService } from './departamentoservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GeneralService } from '@app/services/general.service';
import { IntUrlActivate } from '../gestion-usuario/interfaces/urlActivatedRoute.interface';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-gestion-departamento',
  templateUrl: './gestion-departamento.component.html',
  styleUrls: ['./gestion-departamento.component.scss']
})
export class GestionDepartamentoComponent implements OnInit {

  /**********LIST*************/
  listaDepartamento: Departamento[] = [];
  listaUrl: IntUrlActivate[] = [];

  /******MATCH TABLE && COLUMNS*********** */
  dataSourceDepartamento!: MatTableDataSource<Departamento>;  

  displayedColumnsDepartamento: string[] = ['id','nombre','estado'];
  columnsToDisplayWithExpandDepartamento = [...this.displayedColumnsDepartamento, 'accion'];


  /*******VIEW CHILD*********/
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _departamentoService: DepartamentoserviceService,
    private _gs : GeneralService,
    private rutaActiva: ActivatedRoute,
    
  ) { }

  ngOnInit(): void {
    this.listaUrl = this.rutaActiva.snapshot.url;
    this.getDepartamentos();
  }


  /***********CARGAR DEPARAMENTOS************ */
  getDepartamentos(){
    this._departamentoService.getAllDepartaments().subscribe({
      next: (res) => {
        if(res.data.length > 0){
          this.datosDepartamento(res.data);
        }

      },
      error: (err) => {
        this._gs.alert( 'Problemas al listar los departamentos', '📛', 'red' );
      }
    });

  }

  datosDepartamento(departamento : Departamento[]){
    this.listaDepartamento = [];
    this.listaDepartamento = departamento;
    this.dataSourceDepartamento = new MatTableDataSource(this.listaDepartamento);
    this.dataSourceDepartamento.paginator=this.paginator;
    this.dataSourceDepartamento.sort=this.sort;
  }

  crearDepartamento(){


  }

  editarDepartamento(departamento: Departamento){
                                                           
  }

  eliminarDepartamento(departamento: Departamento){

  }

  applyFilterDepartamento(event: any){

  }

}
