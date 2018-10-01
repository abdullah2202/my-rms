import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { IBooking } from './booking'
import { BookingService } from './booking.service';
import { MatDialog, MatDialogConfig } from '@angular/material';

// Dialogs
import { Dialog } from '../_dialogs/dialog.component';
import { CustomerEdit } from '../_dialogs/customeredit.component';

@Component({
    selector: 'booking-detail',
    templateUrl: './booking-detail.component.html',
    styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {

// Booking Object TODO: Create empty Object when creating new Booking
booking: IBooking;
bookingID = '';

// Boolean for when data is loading
loadingData = false;


dialogConfig = new MatDialogConfig();

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
    this.bookingService.getBooking(this.bookingID);     // ?? Redundent ?? 

    this.bookingService.bookings.subscribe(data => {
        data.forEach((item, index) => {
            if(this.bookingID == item.BookingID){
                this.booking = data[index];
            }
        });
    });

    // Dialog Configuration Defaults
    this.dialogConfig.width = '60vw';
    this.dialogConfig.data = {};
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;

}

/**
 * Test Open Dialog
 */
openDialog(){
    
    this.dialogConfig.data = {id: 123, title: 'Test Dialog'};

    const dialogRef = this.dialog.open(Dialog, this.dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
        console.log('Result: ', data);
    });
}

/**
 * Customer Detail Edit Dialog
 */
openCustomerEditDialog(){
    this.dialogConfig.data = {id: 123, title: 'Edit Customer'};

    const dialogRef = this.dialog.open(CustomerEdit, this.dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
        console.log('Result: ', data);
    });
}


/**
 * Back Button - Go back to listings
 */
goBack(){
    this.router.navigate(['bookings']);
}

}
