import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private horizontalPosition: MatSnackBarHorizontalPosition = 'end'; //'start' | 'center' | 'end' | 'left' | 'right'
  private verticalPosition: MatSnackBarVerticalPosition = 'top'; //'bottom'

  constructor(private snackbar: MatSnackBar) { }

  alert( message:string, icono:string, panelClass : string){
    return this.snackbar.open( message, icono, {
        duration:( 2 * 1000 ),
        horizontalPosition:this.horizontalPosition,
        verticalPosition:this.verticalPosition,
        panelClass: [ panelClass ,'text-center'] //green-  -- red --  warning 
    });
  }


}
