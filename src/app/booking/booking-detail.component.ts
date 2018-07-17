import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { IBooking } from './booking'
import { BookingService } from './booking.service';
import { MatDialog } from '@angular/material';

// Dialogs
import { Dialog } from '../_dialogs/dialog.component';

@Component({
    selector: 'booking-detail',
    templateUrl: './booking-detail.component.html',
    styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {

// Booking Object TODO: Create empty when creating new
booking: IBooking;
bookingID = '';

// Boolean for when data is loading
loadingData = false;


constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router,
    private dialog: MatDialog
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
 * Test Open Dialog
 */
openDialog(){
    const dialogRef = this.dialog.open(Dialog, {
        width: '60vw',
        data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('Result: ', result);
    });
}


/**
 * Back Button - Go back to listings
 */
goBack(){
    this.router.navigate(['bookings']);
}

}
