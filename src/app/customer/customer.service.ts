import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/operator/map'

import { ApiService } from '../services/api.service';

import { ICustomer } from './customer';


@Injectable()
export class CustomerService {

  private baseUrl = "customer";

  
  constructor(
    private http: HttpClient,
    private api: ApiService
  ) { } 


  /**
   * Gets all customers from API
   */
  getCustomers(): Observable<any> {
    return this.api.getAll(this.baseUrl)
        .map(res => {
          return res.data;
        })
        ;
  }

  initCustomerList(): ICustomer[]{
    var customerList = [];
    customerList.push(this.initCustomer());
    customerList.push(this.initCustomer());
    customerList.push(this.initCustomer());
    return customerList;
  }

  initCustomer(): ICustomer{
    return {
      CustomerID: '',
      StoreID: '',
      Name: '',
      Address1: '',
      Address2: '',
      City: '',
      Postcode: '',
      Country: '',
      Telephone: '',
      Email: '',
      Timestamp: '',
      Deleted: '',
      Notes: ''
    };
  }

}
