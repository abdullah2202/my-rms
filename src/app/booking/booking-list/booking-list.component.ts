import { Component, OnInit } from '@angular/core';

import { IBooking } from '../booking';
import { BookingService } from '../booking.service';

import { PagerService } from '../../services/pager.service';


/**
 * Component
 */
@Component({
  selector: 'booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

  bookings: IBooking[];
  allBookings: IBooking[];
  errorMessage: string;

  selectedRows = [];
  selectedCell: string = '';

  pager: any = {};
  pagedItems: any[];
  currentPage: number = 1;

  //Sort Ascending
  sortAsc = false;
  sortField = 'BookingID';

  //Used for pagination
  itemsPerPage = [25,50,100,250,500];
  itemsPerPageSelected = 25;

  //Filters
  filter: any = {};

  colPos = {
    'BookingID':{
      width: '150px'
    },
    'UserID':{
      width: '150px'
    },
    'Store':{
      width: '150px'
    },
    'Customer':{
      width: '250px'
    },
    'Status':{
      width: '150px'
    }
  };
  
  constructor(
    private bookingService: BookingService,
    private pagerService: PagerService
  ) { }

  ngOnInit(): void {

    this.getBookings();

    this.filter = {};

  } 

  getBookings(pageNum? : number){
    this.bookingService.getBookings()
      .subscribe(bookings => {
        this.bookings = bookings;
        this.allBookings = bookings;
        this.setPage(pageNum||1);
      },
      error => this.errorMessage = <any>error);
  }


  setPage(page: number = 1) {
    
    this.currentPage = page;

    if (this.currentPage < 1 || (this.pager.totalPages > 0 && page > this.pager.totalPages)) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.bookings.length, this.currentPage, this.itemsPerPageSelected);

    // get current page of items
    this.pagedItems = this.bookings.slice(this.pager.startIndex, this.pager.endIndex + 1);


  }

  filterResults(filter: any){
    if(filter){
      this.bookings = this.allBookings;
      this.bookings = this.bookings.filter((booking: IBooking) => {
        let match = true;
        let fields = [
          'BookingID',
          'Username',
          'CustomerName',
          'StoreName',
          'StatusName'
        ];
        for(var i = 0; i < fields.length; i++){
          match = this.checkMatch(filter, booking[fields[i]]);
          if(match){break;}
        }
        return match;
      });

      this.setPage(1);
    }else{
      this.resetFilter();
    }
  }

  checkMatch(filter: any, check: any){
    return check.toLocaleLowerCase().indexOf(
      filter.toLocaleLowerCase()
    ) > -1;
  }

  resetFilter(){
    this.filter = {};
    this.bookings = this.allBookings;
    this.setPage(1);
  }

  setItemsPerPage(itemPPId: number){
    this.itemsPerPageSelected = itemPPId;
    this.setPage(1);
  }

  selectCell(cell: string){
    this.selectedCell = cell;
  }

  toggleCheckbox(i: string){
    if(this.selectedRows.includes(i)){
      this.selectedRows.splice(
        this.selectedRows.indexOf(i),1
      );
    }else{
      this.selectedRows.push(i);
    }
  }

  // Check all items in display - Called fro checkbox in header
  checkAll(){
    this.uncheckAll();
    for(var i=0;i<this.bookings.length;i++){
        this.selectedRows.push(this.bookings[i].BookingID);
    }
  }

  uncheckAll(){
    this.selectedRows.splice(0,this.selectedRows.length);
  }

  isSomeChecked(){
    if(
      this.selectedRows.length>0 &&
      this.selectedRows.length!=this.bookings.length
    ){
      return true;
    }else{
      return false;
    }
  }




  sortBy(fieldName: string = 'BookingID'){
    
    // Invert sorting direction variable
    this.sortAsc = !this.sortAsc;

    // Sort the array
    this.bookings.sort((a,b) => {
      var x = a[fieldName].toLowerCase();
      var y = b[fieldName].toLowerCase();
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

    // Invert sorting direction
    if(!this.sortAsc){
      this.bookings.reverse();
    }

    // Refresh the view
    this.setPage(this.currentPage);
    
  }

}
