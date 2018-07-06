import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  // Split words into characters and assign to variable (Obfuscate) 
  private baseUrl: string = "http://localhost:80/api/";
  //private baseUrl: string = "https://www.rmbooker.com/apitest/";


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

}
