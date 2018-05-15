import { Component, OnInit } from '@angular/core';
import { IBooking } from './booking';
import { BookingService } from './booking.service';
import { PagerService } from '../services/pager.service';
import {TableListComponent} from '../table/table-list.component';
import { MaterialAppModule } from '../material.module';

/**
 * Component
 */
@Component({
  selector: 'booking-list',
  templateUrl: '../table/table-list.component.html',
  styleUrls: ['../table/table-list.component.scss']
})
export class BookingListComponent extends TableListComponent implements OnInit{

  // Data
  data: IBooking[];
  allData: IBooking[];

  // Primary field for Data
  primaryField = 'BookingID';

  // Default Sorting field
  sortField = 'BookingID';

  // Fields to be filtered
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
