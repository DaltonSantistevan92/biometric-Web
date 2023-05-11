import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '@auth/interfaces/auth-interface';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  error: string = '';
  @Input('user') user!:User;

  constructor(
    public dialog : MatDialogRef<PerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data:User,
  ) { }

  ngOnInit(): void {
    console.log('estamos en perfil', this.data);
    this.listarPerfil();
  }

  close(){
    this.dialog.close();
  }

  listarPerfil(){

  }
}
