import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }


  public addUsuario(info:any):Observable<any>{
    return this.http.post(
      'http://localhost:3000/usuario/add',
      {info},
      {observe:'response'}
    )
  }

}
