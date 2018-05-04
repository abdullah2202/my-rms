import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, publishReplay } from 'rxjs/operators';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiService {

  private baseUrl: string = "http://localhost:80/api/";
  

  constructor(
    private http: HttpClient  
  ) { 
  }

  // GET
  getAll(action: string): Observable<any>{
    return this.http.get(this.baseUrl + action);
  }
  
  getById(action: string, id: string){}

  // POST
  create(action: string, data: any){}

}
