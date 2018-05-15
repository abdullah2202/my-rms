import { Component, OnInit, Injector } from '@angular/core';

import { IBooking } from '../booking';
import { BookingService } from '../booking.service';

import { PagerService } from '../../services/pager.service';

import {MatButtonModule} from '@angular/material/button';

import {TableListComponent} from '../../table/table-list.component';

/**
 * Component
 */
@Component({
  selector: 'booking-list',
  templateUrl: '../../table/table-list.component.html',
  styleUrls: ['../../table/table-list.component.scss']
})
export class BookingListComponent extends TableListComponent implements OnInit{

  data: IBooking[];
  allData: IBooking[];

  primaryField = 'BookingID';

  sortField = 'BookingID';

  //Filters
  filterFields: any = [
    'BookingID',
    'Username',
    'CustomerName',
    'StoreName',
    'StatusName'
  ];
  
  constructor(
    private bookingService: BookingService,
    protected pagerService: PagerService
  ) {
    super(pagerService);
  }

  ngOnInit(): void {
    this.getBookings();
  } 

  getBookings(pageNum? : number){
    this.bookingService.getBookings()
      .subscribe(d => {
        this.data = d.data;
        this.allData = d.data;
        this.headers = d.headers;
        this.setPage(pageNum||1);
      },
      error => this.errorMessage = <any>error);
  }

}
