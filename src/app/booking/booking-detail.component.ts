import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { IBooking } from './booking'
import { BookingService } from './booking.service';



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
    private bookingService: BookingService,
    private router: Router
){
    this.route.params.subscribe(params => {this.bookingID = params.id});
    this.booking = this.bookingService.initBooking();
}

ngOnInit(){
    
    // Get booking from service
    this.bookingService.getBooking(this.bookingID);


    this.bookingService.bookings.subscribe(data => {
        data.forEach((item, index) => {
            if(this.bookingID == item.BookingID){
                this.booking = data[index];
            }
        });
    });
    
}

/**
 * Back Button - Go back to listings
 */
goBack(){
    this.router.navigate(['bookings']);
}

}
