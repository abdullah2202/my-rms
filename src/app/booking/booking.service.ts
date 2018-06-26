import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { ApiService } from '../services/api.service';
import { IBooking } from './booking';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BookingService {

  private baseUrl = "bookings";
  
//  private bookings: Observable<any>;

  // List of Bookings
  private bookingListSource = new BehaviorSubject(this.initBookingList());
          bookingList = this.bookingListSource.asObservable();

  // One selected Booking
  private bookingSource = new BehaviorSubject(null);
          booking = this.bookingSource.asObservable();

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) { 
      // Run here to have results when service starts
      this.getBookings();
  } 

  /** 
   * Use Behaviour Subject - Refresh
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

  initBookingList(): IBooking[]{
    let inits = [
      this.initBooking(),
      this.initBooking()
    ];
    return inits;
  }

}
