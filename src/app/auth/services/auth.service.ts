import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

import { JwtHelperService} from '@auth0/angular-jwt';
import decode from 'jwt-decode'
import { IntAuth, IntDataUser, IntPayload } from '../interfaces/auth-interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private _listaMenus : any [] = [];  //lista de menus

  /* get menu(): any { //getter de menu
    return [...this._listaMenus];
  } */

  public decodificar! : IntPayload;

  get token(): string {
    return JSON.parse(localStorage.getItem('token')!) || '';
  } 

  get tokenDecodificado() : IntPayload {
    return this.decodificar = decode(this.token);
  }

  private objSourcePayload = new BehaviorSubject<IntPayload>({} as IntPayload);
  public readonly $getObjSourcePayload : Observable<IntPayload> = this.objSourcePayload.asObservable();

  constructor(
    private route: Router,    
    private http: HttpClient,
    private jwtHelper:JwtHelperService,

  ) { }

  api = environment.apiUrl;

  verificacionAutenticacion():Observable<boolean>{
    if (this.jwtHelper.isTokenExpired(this.token) || !this.token) { return of(false); }
    return of(true);
  }


  login(data:IntDataUser): Observable<IntAuth>{
    const url = `${this.api}/loginWeb`;
    return this.http.post<IntAuth>(url,data)
    .pipe(tap( (resp) => {
      if (resp.status) {
        this.setLocalStorage('token',resp.token);
        this.decodificar = decode(resp.token);
        this.sendObjePayload(this.decodificar); 
      }
    })
    );
  }

  sendObjePayload(data:IntPayload){
    this.objSourcePayload.next(data);
  }

  setLocalStorage( key:string, token:string ){
    localStorage.setItem(key, JSON.stringify(token));
  }

  deleteLocalStorage( key:string ){
    localStorage.removeItem(key);
  }




}
