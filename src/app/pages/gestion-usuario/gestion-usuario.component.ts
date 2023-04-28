import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from "@angular/material/paginator";
import { UsuarioService } from './usuario.service';
import { Usuario } from './interfaces/user-interface';
import { GeneralService } from 'src/app/services/general.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearEditarUsuarioComponent } from './crear-editar-usuario/crear-editar-usuario.component';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.scss']
})
export class GestionUsuarioComponent implements OnInit {
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  //dataSource! : MatTableDataSource<any>;

 /*  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'accion'];
  dataSource!: MatTableDataSource<PeriodicElement>;

  
  //expandedElementAdminProyecto!: any | null;
  lista: PeriodicElement[] = []; */



  displayedColumnsUsuario: string[] = ['nombres', 'apellidos', 'email', 'cargo'];
  columnsToDisplayWithExpandUsuario = [...this.displayedColumnsUsuario, 'accion'];
  dataSourceUsuario!: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listaUsuario: Usuario[] = [];


  constructor(
    private paginatorLabel: MatPaginatorIntl,
    private _us: UsuarioService,
    private _gs : GeneralService,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.paginatorLabel.itemsPerPageLabel = "Items por página"
    this.getUserLista();
  }

  getUserLista() {
    this._us.getUser().subscribe({
      next: (resp) => { 
        if (resp.data.length > 0) {
          this.datosUsuario(resp.data);
        }
      },
      error: (err) => {
        this._gs.alert( 'Problemas con listar usuario', '📛', 'red' );
      }
    })
  }


  datosUsuario(usuario : Usuario[]){
    this.listaUsuario = [];
    this.listaUsuario = usuario;
    this.dataSourceUsuario = new MatTableDataSource(this.listaUsuario);
    this.dataSourceUsuario.paginator = this.paginator;
    this.dataSourceUsuario.sort = this.sort;
  }



  /* ngAfterViewInit() {
    this.dataSourceUsuario.paginator = this.paginator;
    this.dataSourceUsuario.sort = this.sort;
  } */


  crearUsuarios() {
    const dialogRef = this.dialog.open(CrearEditarUsuarioComponent, {width: '620px', height: '600px'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilterUsuario(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUsuario.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceUsuario.paginator) {
      this.dataSourceUsuario.paginator.firstPage();
    }
  }


  eliminarUsuario(data: any) {
    console.log('eliminando', data);

  }

  editarUsuario(usuario: Usuario) {
    console.log('editando', usuario);
    //const dialogRef = this.dialog.open(CrearEditarUsuarioComponent);
    const dialogRef = this.dialog.open(CrearEditarUsuarioComponent, { disableClose: true, data:usuario, width: '620px', height: '600px'} );
    dialogRef.afterClosed().subscribe( (result : Usuario) => {
      if (result != undefined) { 
        console.log(`Dialog editar Usuario result: ${ result }`);
      }
    });
  }

}
