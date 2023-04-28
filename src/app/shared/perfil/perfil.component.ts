import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/auth/interfaces/auth-interface';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(
    public dialog : MatDialogRef<PerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data:User,
  ) { }

  ngOnInit(): void {
    console.log('estamos en perfil', this.data);
    
  }

  close(){
    this.dialog.close();
  }

}
