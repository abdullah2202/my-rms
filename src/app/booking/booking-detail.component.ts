import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBooking } from './booking'
import { BookingService } from './booking.service';

@Component({
    selector: 'booking-detail',
    templateUrl: './booking-detail.component.html'
})
export class BookingDetailComponent implements OnInit {

constructor(private route: ActivatedRoute){
    this.route.params.subscribe(params => console.log(params) );
}

ngOnInit(){

}

}
