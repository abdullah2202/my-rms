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

//  private bookings: Observable<any>;

  /**
   * BehaviorSubject
   * 
   * Works but will not load list automatically and very difficult to
   * get single record, from either server or locally stored
   */

  // List of Bookings
  private bookingListSource = new BehaviorSubject(this.initBookingList());
          bookingList = this.bookingListSource.asObservable();

  // One selected Booking
  private bookingSource = new BehaviorSubject(null);
          booking = this.bookingSource.asObservable();


  /**
   * BehaviorSubject & Observables
   * https://coryrylan.com/blog/angular-observable-data-services
   * 
   * Looks a lot better, started on 26/06/18
   * 
   * Any new code or methods will have a comment with NEW-BSO
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
      // Run here to have results when service starts
      this.getBookings();

      // START NEW-BSO
      this.dataStore = { bookings: [] };
      this._bookings = <BehaviorSubject<any>>new BehaviorSubject(this.initData());
      // END NEW_BSO
  } 


  /**
   * NEW_BSO
   * 
   * Get method for bookings - returns an Observable
   * 
   */
  get bookings(){
    return this._bookings.asObservable();
  }

  /**
   * NEW-BSO
   * 
   * Get all bookings from server
   * 
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
   * Use Behavior Subject - Refresh
   * 
   * Check if data persists without asking server for reload
   */
  getBookings(){
    //GET OBSERVABLE FROM api service
    this.api.getAll(this.baseUrl)
      .map(res => {
        return res;
    })
    .subscribe(bookings => {
      this.bookingListSource.next(bookings);
    })
    ;
  }

  /**
   * Get single Booking object, with all information
   * 
   * @param id Booking ID 
   */
  getBooking(id){
    
    /*
    this.bookingList
    .map(
      bookings => {
        return bookings.find(item => item.BookingID == id);
    })
    .subscribe(booking => {
      this.bookingSource.next(booking);
    })
    ;*/
  }

  initData(){
    return {
      'data' : this.initBookingList(),
      'headers' : this.initHeaders()
    };
  }

  initHeaders(){
    return [
      {
        'id'    : 'BookingID',
        'name'  : 'Booking ID',
        'field' : 'BookingID',
        'width' : '150px',
        'order' : '0'
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
    let inits = [
      this.initBooking()
    ];
    return inits;
  }

}
