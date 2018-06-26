import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { catchError, map, find } from 'rxjs/operators';

import { IBooking } from './booking'
import { BookingService } from './booking.service';

import { MaterialAppModule } from '../material.module';


@Component({
    selector: 'booking-detail',
    templateUrl: './booking-detail.component.html',
    styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {

booking: IBooking;
bookingID = '';

loadingData = false;

constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
){
    this.route.params.subscribe(params => {this.bookingID = params.id});
    this.booking = this.bookingService.initBooking();
}

ngOnInit(){
    
    this.bookingService.getBooking(this.bookingID);

    this.bookingService.bookings.subscribe(data => {
        this.booking = data[0];
    });
    
}

}
