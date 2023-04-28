import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { InterfaceUsuario } from './interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  api = environment.apiUrl;
  http = inject(HttpClient);


  getUser() : Observable<InterfaceUsuario>{
    const url = `${this.api}/user`;
    return this.http.get<InterfaceUsuario>(url);
  }
}
