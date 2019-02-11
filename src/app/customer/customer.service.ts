import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { ApiService } from '../services/api.service';
import { ICustomer } from './customer';


@Injectable()
export class CustomerService {

  // Obfuscate this
  private baseUrl = "customers";

  // The observables to be pushed to everyone
  private _customers: BehaviorSubject<any>;
  private _headers: BehaviorSubject<any>;

  // dataStore to store data
  private dataStore: {
    customers: any[];
    headers: any[];
  }

  private initLoaded: boolean = false;
  
  constructor(
    private http: HttpClient,
    private api: ApiService
  ) {
    // Create blank dataStore, _customers and _headers
    this.dataStore = { customers: [] , headers : []};
    this._customers = <BehaviorSubject<any>>new BehaviorSubject(this.initData());
    this._headers = <BehaviorSubject<any>>new BehaviorSubject(this.initHeaders());
  } 

  /**
   * Get Method for Customers
   */
  get customers(){
    return this._customers.asObservable();
  }

  /**
   * Get Method for Headers
   */
  get headers(){
    return this._headers.asObservable();
  }

  /**
   * Get all Customers
   */
  getAll(){
    this.api.getAll(this.baseUrl).subscribe(data => {

      // Update the Data Store
      this.dataStore.customers = data.data;
      this.dataStore.headers = data.headers;

      // Update the Observables
      this._customers.next(Object.assign({}, this.dataStore).customers);
      this._headers.next(Object.assign({}, this.dataStore).headers);

    }, error => console.log('Could not load Customers.'));
  }

  /**
   * Check if data has already been loaded, to avoid same data being 
   * loaded from server each time component is init
   */
  initialGetAll(){
    if(!this.initLoaded){
      this.getAll();
      this.initLoaded = true;
    }
  }

  /**
   * 
   * Get a single customer record
   * 
   * @param id Customer ID
   */
  getCustomer(id: string){

    // Already have record in cache
    let alreadyHave = false;

    // Iterate through all customers
    this.dataStore.customers.forEach((item) => {
      
      // If a match is found
      if(item.CustomerID === id){
        alreadyHave = true;
      }
    });

    // If local data store does not have record -> get from server
    if(!alreadyHave){

      // Use API method to get single record by id
      this.api.getById(this.baseUrl,id).subscribe(data => {

        // Not found yet
        let notFound = true;

        // Search data store for record to prevent duplictes
        this.dataStore.customers.forEach((item, index) => {

          // If the downloaded record matches one in data store
          if(item.CustomerID === data[0].CustomerID){

            // Store an updated version of record
            this.dataStore.customers[index] = data[0];

            // Is found now
            notFound = false;
          }
        });

        // If record is not found
        if(notFound){

          // Push new record into the data store
          this.dataStore.customers.push(data[0]);

          notFound = false;
        }

        // Push new observable
        this._customers.next(Object.assign({}, this.dataStore).customers);

      }, error => console.log('Could not load customer. Error: ' + error));

    }



  }

  /**
   * Initialize default data to display
   */
  initData(){
    return this.initCustomerList();
  }

  /**
  * Initialize default headers
  */
  initHeaders(){
    return [
      {
        'id'    : '',
        'name'  : '',
        'field' : '',
        'width' : '',
        'order' : ''
      }
    ]
  }

  /**
   * Create Customer object with type ICustomer
   */
  initCustomer(): ICustomer{
    return {
      Name: ''
    };
  }

  /**
   * Return a list of customers
   */
  initCustomerList(): ICustomer[]{
    return [
      this.initCustomer()
    ];
  }

}
