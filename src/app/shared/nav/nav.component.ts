import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '@auth/interfaces/auth-interface';
import { AuthService } from '@auth/services/auth.service';
import { PerfilComponent } from '@shared/perfil/perfil.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input('user') user!:User;

  constructor(
    private _authSer : AuthService,
    private router : Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  
  }

  salir(){
    this._authSer.deleteLocalStorage('token');
    this.router.navigate(['/login']);
  }


  modalPerfil(){
    const dialogRef = this.dialog.open(PerfilComponent, { disableClose: true, data:this.user, width: '620px', height: '380px'} );

    dialogRef.afterClosed().subscribe( (result : User) => {
      if (result != undefined) { 
        console.log(`Dialog editar perfil result: ${ result }`);
    
      }
    });
  }




}
