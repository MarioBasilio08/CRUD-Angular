import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Customer, Respuesta, RespuestaGetById } from '../interfaces/customer';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WCFService {
  private readonly URL = 'https://localhost:7046/api/Customer/';

  constructor(private http: HttpClient) { }

  // // public getList() : Observable<Customer[]>  {
  // //   return this.http.get<Customer[]>(`${this.URL}GetList`)
  // // }


  getList(){
    return this.http.get<Respuesta>(`${this.URL}GetList`).pipe(
      map(resp => {
        console.log(resp.response)
        return resp;
      })
    )
  }

  saveCustomer(c:Customer){
    return this.http.post<any>(`${this.URL}Save`,c);
  }

  deleteCustomer(id:number){
    return this.http.delete<any>(`${this.URL}Delete/${id}`)
  }

  editCustomer(c:Customer){
    return this.http.put<any>(`${this.URL}Update`,c)
  }

  getById(id:number){
    return this.http.get<RespuestaGetById>(`${this.URL}GetById/${id}`).pipe(
      map(resp => {
        return resp;
      })
    )
  }
}
