import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

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
  private _headers: BehaviorSubject<any>;

  private dataStore: {
    bookings: any[];
    headers: any[];
  }

  private initLoaded: boolean = false;

  constructor(
    private api: ApiService
  ) { 
      this.dataStore = { bookings: [] , headers : []};
      this._bookings = <BehaviorSubject<any>>new BehaviorSubject(this.initData());
      this._headers = <BehaviorSubject<any>>new BehaviorSubject(this.initHeaders());
  } 


  /**
   * Get method for bookings - returns an Observable
   */
  get bookings(){
    return this._bookings.asObservable();
  }

  get headers(){
    return this._headers.asObservable();
  }

  /**
   * Get all bookings from server - refresh data
   */
  getAll(){
    this.api.getAll(this.baseUrl).subscribe(data => {

      this.dataStore.bookings = data.data;
      this.dataStore.headers = data.headers;

      // Push a new copy of the bookings list to all Subscribers
      this._bookings.next(Object.assign({}, this.dataStore).bookings);
      this._headers.next(Object.assign({}, this.dataStore).headers);

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
  getBooking(id:string){

    // Already have booking in cache
    let alreadyHave = false;

    // Check local data store for booking
    this.dataStore.bookings.forEach((item) => {

      // If current item Booking == Booking ID
      if(item.BookingID === id){
        alreadyHave = true;
      }
    });

    // If local data store does not have booking download
    if(!alreadyHave){

      // Get record from server using API
      this.api.getById(this.baseUrl,id).subscribe(data => {

        // If Booking does not exists in current list
        let notFound = true;

        this.dataStore.bookings.forEach((item, index) => {

          if(item.BookingID === data[0].BookingID){

            // Store updated version of data
            this.dataStore.bookings[index] = data[0];

            notFound = false;
          }
        });

        // If record does not exists in current list
        if(notFound){

          this.dataStore.bookings.push(data[0]);

          notFound = false;
        }

        // Push new observable
        this._bookings.next(Object.assign({}, this.dataStore).bookings);

      }, error => console.log('Could not load booking. Error: ' + error));

    }



  }

  /**
   * Initialize default data to display
   */
  initData(){
    return this.initBookingList();
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
      CustomerTelephone: '',
      CustomerEmail: '',
      StatusID: '',
      StatusName: '',
      StatusCss: '',
      Collected: '',
      BookedDate: new Date(),
      DueDate: new Date()
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
