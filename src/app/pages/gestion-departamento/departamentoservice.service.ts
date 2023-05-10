import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento, IDepartamento } from './interfaces/departamento.interface';
@Injectable({
  providedIn: 'root'
})
export class DepartamentoserviceService {

  api = environment.apiUrl;
  http = inject(HttpClient);

  constructor() { }

  getAllDepartaments() : Observable<IDepartamento>{
    const url = `${this.api}/departament/list`;
    return this.http.get<IDepartamento>(url);
  }

  createDepartament(data:Departamento) : Observable<IDepartamento>{
    const url = `${this.api}/departament/save`;
    return this.http.post<IDepartamento>(url,data);
  }

  updateDepartament(data:Departamento) : Observable<IDepartamento>{
    const url = `${this.api}/departament/update`;
    return this.http.post<IDepartamento>(url,data);
  }

  deleteDepartament(id:number) : Observable<IDepartamento>{
    const url = `${this.api}/departament/delete/${id}`;
    return this.http.get<IDepartamento>(url);
  }




}
