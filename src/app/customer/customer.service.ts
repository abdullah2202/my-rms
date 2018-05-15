import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { ApiService } from '../services/api.service';
import { ICustomer } from './customer';


@Injectable()
export class CustomerService {

  private baseUrl = "customers";
  
  constructor(
    private http: HttpClient,
    private api: ApiService
  ) { } 

  getCustomers(): Observable<any> {
    return this.api.getAll(this.baseUrl)
        .map(res => {
          return res;
        })
        ;
  }

}
