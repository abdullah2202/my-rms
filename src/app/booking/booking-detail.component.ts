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

constructor(private route: ActivatedRoute){
    this.route.params.subscribe(params => {this.bookingID = params.id});
}

ngOnInit(){



}

}
