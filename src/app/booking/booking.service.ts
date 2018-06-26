import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiService } from '../services/api.service';
import { IBooking } from './booking';


@Injectable()
export class BookingService {

  // Obfuscate this before production
  private baseUrl = "bookings";

  /**
   * BehaviorSubject & Observables
   * https://coryrylan.com/blog/angular-observable-data-services
   * 
   */

  private _bookings: BehaviorSubject<any>;

  private dataStore: {
    bookings: IBooking[];
  }

  private initLoaded: boolean = false;

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) { 
      this.dataStore = { bookings: [] };
      this._bookings = <BehaviorSubject<any>>new BehaviorSubject(this.initData());
  } 


  /**
   * Get method for bookings - returns an Observable
   */
  get bookings(){
    return this._bookings.asObservable();
  }

  /**
   * Get all bookings from server
   */
  getAll(){
    this.api.getAll(this.baseUrl).subscribe(data => {
      this.dataStore.bookings = data;

      // Push a new copy of the bookings list to all Subscribers
      this._bookings.next(Object.assign({}, this.dataStore).bookings);
    }, error => console.log('Could not load Bookings.'));
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
   * Get single Booking object, with all information
   * 
   * @param id Booking ID 
   */
  getBooking(id){
  }

  /**
   * Initialize default data to display
   */
  initData(){
    return {
      'data' : this.initBookingList(),
      'headers' : this.initHeaders()
    };
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
   * Returns a single empty IBooking instance
   */
  initBooking(): IBooking{
    return {
      BookingID: '',
      UserID: '',
      Username: '',
      StoreID: '',
      StoreName: '',
      CustomerID: '',
      CustomerName: '',
      StatusID: '',
      StatusName: '',
      StatusCss: ''
    };
  }

  /**
   * Returns a list of IBooking instances
   */
  initBookingList(): IBooking[]{
    return [
      this.initBooking()
    ];
  }

}
