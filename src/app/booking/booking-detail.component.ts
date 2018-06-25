import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBooking } from './booking'
import { BookingService } from './booking.service';

@Component({
    selector: 'booking-detail',
    templateUrl: './booking-detail.component.html',
    styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {

bookingID = '';
bookings: IBooking[];
currentBookingID: string;

constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
){
    this.route.params.subscribe(params => {this.bookingID = params.id});
}

ngOnInit(){

    // Get all bookings from service
    this.bookingService.booking.subscribe(
        bookings => {
          this.bookings = bookings['data'];
        }
    );

    // TODO: also get other details, such as customer information.

//    console.log(this.bookings);

}

}
