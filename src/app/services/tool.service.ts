import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  api = environment.apiUrl;
  http = inject(HttpClient);

  mostrarArchivo(folder:string,file:string){
    let url = `${this.api}/mostrarImagen/${folder}/${file}`;
    return this.http.get(url , { responseType: 'blob' });
  }


  mostrarFile(folder:string,file:string){
    let url = `${this.api}/mostrarImagen/${folder}/${file}`;
    return this.http.get(url);
  }

  subirArchivo(files: Array<File>, name:string, url:string){
    let urlCompleta = `${this.api}/${url}`;
    let formdata = new FormData();
    
    if(files){
      for(let i = 0; i < files.length; i++){
        formdata.append(name + '-'+ i,files[i], files[i].name);
     }
    }
   return this.http.post(urlCompleta, formdata);
  }
}
