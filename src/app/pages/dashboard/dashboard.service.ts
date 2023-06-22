
import { environment } from '@env/environment.prod';
import { HttpClient } from '@angular/common/http'; 
import { Observable, tap } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { IntRegrecion } from './interfaces/dashboard.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  api = environment.apiUrl;
  http = inject(HttpClient);


  cargarTipoAsistencia() : Observable<any>{
    let url = this.api + '/getTipoAsistencia';
    return this.http.get<any>(url);
  }


  regresionLinealAsistencia(temporalidad_id:number,tipo_asistencia_id:number,fechaInicio:string,fechaFin:string) : Observable<IntRegrecion>{
    let url = `${this.api}/regresionLinealAsistencias/${temporalidad_id}/${tipo_asistencia_id}/${fechaInicio}/${fechaFin}`;
    return this.http.get<IntRegrecion>(url);
  }
}
