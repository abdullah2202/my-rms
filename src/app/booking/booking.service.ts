import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { ApiService } from '../services/api.service';
import { IBooking } from './booking';

@Injectable()
export class BookingService {

  private baseUrl = "bookings";

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) { } 

  getBookings(): Observable<any> {
    return this.api.getAll(this.baseUrl)
        .map(res => {
          return res;
        })
        ;
  }

}
