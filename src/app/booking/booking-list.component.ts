import { Component, OnInit } from '@angular/core';
import { IBooking } from './booking';
import { BookingService } from './booking.service';
import { PagerService } from '../services/pager.service';
import { TableListComponent } from '../table/table-list.component';
import { Router } from '@angular/router';
  
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
    protected pagerService: PagerService,
    private router: Router
  ) {
    super(pagerService);
  }

  ngOnInit(): void {
    this.bookingService.booking.subscribe(
      bookings => {
        this.data = bookings['data'];
        this.allData = bookings['data'];
        this.headers = bookings['headers'];
        this.setPage(1);
      }
    );
  } 

  //Overwrite Functions
  showDetails(id: string){
    this.router.navigate(['bookings', id]);
  }

  refreshData(){
    this.bookingService.getBookings();
  }

  // Not Used - Using Behaviour Subject Now
  getBookings(pageNum? : number){
    this.loadingData = true;
    this.bookingService.getBookingsOld()
      .subscribe(d => {
        this.data = d.data;
        this.allData = d.data;
        this.headers = d.headers;
        this.setPage(pageNum||1);
        this.loadingData = false;
      },
      error => this.errorMessage = <any>error);
  }

}
