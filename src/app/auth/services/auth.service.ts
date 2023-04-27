import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _listaMenus : any [] = [];  //lista de menus

  get menu(): any { //getter de menu
    return [...this._listaMenus];
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  } 

  private objSourceUser = new BehaviorSubject<{}>({});
  $getObjSourceUser = this.objSourceUser.asObservable();


  constructor(
    private route: Router,    
    private http: HttpClient
  ) { }

  api = environment.apiUrl;

  verificacionAutenticacion():Observable<boolean>{
    const token = localStorage.getItem('token');

    if (!token) { return of(false); }//this.jwtHelper.isTokenExpired(token) ||
    return of(true);
  }


  login(data:any): Observable<any>{
    const url = `${this.api}/login`;
    return this.http.post<any>(url,data)
    .pipe(tap( (resp) => {
        if (resp.token && resp.user) {//&& resp.menu.length > 0
          this.setLocalStorage('token', resp.token);
          
          this.sendObjeUser(resp.user);
          this.setLocalStorage('user', resp.user);

          //this._listaMenus = resp.menu; // recuperamos el menu y lo igualmos a la lista
          //localStorage.setItem('menu', JSON.stringify(this._listaMenus));
        }else{
          return;
        }
      })
    );
  }

  sendObjeUser(data:any){
    this.objSourceUser.next(data);
  }

  setLocalStorage(key:string, data : any){
    localStorage.setItem(key, JSON.stringify(data));
  }




}
