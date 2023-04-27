import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  emailValidate: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(
    private fb: FormBuilder,
    private router : Router,
    
    private _auSer: AuthService,


  ) { }

  ngOnInit(): void {
    //this.initForm()
  }

 /*  initForm(){
    this.formLogin = this.fb.group({
			email: ['', [Validators.required, Validators.email,  Validators.pattern(this.emailValidate)]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
  } */

  login(){
    console.log("******login*****");
  }

  loginAcceso(data: any){
    console.log("Data a enviar: ", data);
    this._auSer.login(data).subscribe({

      next: (resp) => { 
        if (resp.status) {
          this.router.navigate(['/home']);
          //this._auSer.Mensaje(resp.message);
        }
      }, 
      error: (err) => { 
        console.log(err);
        //this._auSer.Mensaje(err.error.message,'danger');
      }
    });  

  }

  

}
