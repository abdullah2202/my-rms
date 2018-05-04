import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, publishReplay } from 'rxjs/operators';
import 'rxjs/add/operator/map'

import { ApiService } from '../services/api.service';

import { IBooking } from './booking';

@Injectable()
export class BookingService {

  private baseUrl = "bookings";

  private BookingSource = new BehaviorSubject<IBooking[]>(this.initBookingList());
  currentBookingList = this.BookingSource.asObservable();
  
  constructor(
    private http: HttpClient,
    private api: ApiService
  ) { } 

  getNewBookings(){
    this.api.getAll(this.baseUrl).map(res => {
      
    });
  }

  getBookings(): Observable<any> {
    return this.api.getAll(this.baseUrl)
        .map(res => {
          console.log(res);
          return res;
        });
  }

  initBookingList(): IBooking[]{
    var bookingList = [];
    bookingList.push(this.initBooking());
    bookingList.push(this.initBooking());
    bookingList.push(this.initBooking());
    return bookingList;
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

}
