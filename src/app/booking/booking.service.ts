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
  private bookings: Observable<any>;
  private bookingSource = new BehaviorSubject({'data':[],'headers':[]});
          booking = this.bookingSource.asObservable();


  constructor(
    private http: HttpClient,
    private api: ApiService
  ) { 
      // Run here to have results when service starts
      this.getBookingsNew();
  } 

  /** 
   * Use Behaviour Subject - Refresh
   * 
   * Check if data persists without asking server for reload
   */
  getBookingsNew(){
    //GET OBSERVABLE FROM api service
    this.api.getAll(this.baseUrl)
      .map(res => {
        return res;
    })
    .subscribe(bookings => {
      this.bookingSource.next(bookings);
    })
    ;
  }

  // Not being used, using Behaviour Subject Now
  getBookings(refresh: boolean = false): Observable<any> {
    if(refresh || typeof this.bookings === 'undefined' || !this.bookings){
      this.bookings = this.api.getAll(this.baseUrl)
      .map(res => {
        return res;
      });
    }
    return this.bookings;
  }


}
