import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBooking } from './booking'
import { BookingService } from './booking.service';

import { MaterialAppModule } from '../material.module';


@Component({
    selector: 'booking-detail',
    templateUrl: './booking-detail.component.html',
    styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {

bookingID = '';
bookings: IBooking[];
currentBooking: IBooking;

loadingData = false;

constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
){
    this.route.params.subscribe(params => {this.bookingID = params.id});
}

ngOnInit(){
    /*
    this.loadingData = true;

    this.bookingService.booking.subscribe(
        booking => {
            this.bookingService.getBooking(this.bookingID);
            this.currentBooking = booking;
            this.loadingData = false;
        }
    );*/

    console.log(document.location.host);
}

loadBooking(id){
    this.bookingService.getBooking(id);
}

}
