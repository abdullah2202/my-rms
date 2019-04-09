import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ApiService {

  // Split words into characters and assign to variable (Obfuscate) 
  //private baseUrl: string = "http://localhost/api/";
   private baseUrl: string = "https://www.rmbooker.com/apitest/";


  constructor(
    private http: HttpClient  
  ) { }

  // GET
  getAll(action: string): Observable<any>{
    return this.http.get(this.baseUrl + action);
  }
  
  // GET: ID
  getById(action: string, id: string): Observable<any>{
    return this.http.get(this.baseUrl + action + '/' + id);
  }

  // POST
  create(action: string, data: any){}


  // UPDATE: ID

  // DELETE: ID

}
