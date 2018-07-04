import { Component, OnInit } from '@angular/core';
import { IBooking } from './booking';
import { BookingService } from './booking.service';
import { PagerService } from '../services/pager.service';
import { TableListComponent } from '../table/table-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextMenuComponent } from '../context/context-menu.component';

/**
 * Component
 */
@Component({
  providers: [ContextMenuComponent],
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

  //Default to Processing in future, for dev show all
  displaySort = '';
  displaySortField = 'StatusName';

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
    protected contextMenu: ContextMenuComponent,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(pagerService, contextMenu);

    // If a sort field as selected
    this.route.data.subscribe(d => {
      if(d.sort){
        this.displaySort = d.sort;
      }
    });
  }

  ngOnInit(): void {

    // Get Initial Data - Stops from accessing server everytime
    // component loads
    this.bookingService.initialGetAll();

    // Get Headers from service
    this.bookingService.headers.subscribe(headers => {
      this.headers = headers;
    });

    // Get Data from service
    this.bookingService.bookings.subscribe(bookings =>{
      this.data = bookings;
      this.allData = bookings;

      // Set to page 1
      this.setPage(1);
    });

    // Sort the data (Processig, Completed etc)
    this.selectData(this.displaySort);

  } 

  /**
   * Select the type of bookings to display
   * 
   * In production set this to default as processing
   * 
   * @param sort: string - the type of data to filter by
   * 
   */
  selectData(sort: string){
    if(sort && sort.length>0){
      this.filterResults(sort,this.displaySortField,true);
    }else{
      // Default - uncomment in production
//      this.displaySort = 'processing';
//      this.selectData(this.displaySort);
    } 
  }

  //Overwrite Functions
  showDetails(id: string){
    this.router.navigate(['bookings', id]);
  }

  refreshData(){
    this.bookingService.getAll();
  }

}
