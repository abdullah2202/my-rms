import { Component, OnInit } from '@angular/core';

import { IBooking } from '../booking';
import { BookingService } from '../booking.service';

import { PagerService } from '../../services/pager.service';
import { MatButton } from '@angular/material/button';
import { Observable } from 'rxjs/Observable';


/**
 * Component
 */
@Component({
  selector: 'booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

  bookings: Observable<IBooking[]>;
  errorMessage: string;

  selectedRow: string = '';
  selectedRows = [];
  selectedCell: string = '';

  pager: any = {};
  pagedItems: any[];

  //Used for pagination
  itemsPerPage = [25,50,100,250,500];
  itemsPerPageSelected = 25;

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

/** Observable with async method */
    this.bookings = this.bookingService.getBookings();


  } 

  getBookings(pageNum? : number){
    this.bookingService.getBookings()
      .subscribe(bookings => {
        this.bookings = bookings;
        this.setPage(pageNum||1);
      },
      error => this.errorMessage = <any>error);
  }


  setPage(page: number) {
    /*
    if (page < 1 || (this.pager.totalPages > 0 && page > this.pager.totalPages)) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.bookings.length, page, this.itemsPerPageSelected);

    // get current page of items
    this.pagedItems = this.bookings.slice(this.pager.startIndex, this.pager.endIndex + 1);
    */
  }

  setItemsPerPage(itemPPId: number){
    this.itemsPerPageSelected = itemPPId;
    this.setPage(1);
  }

  
  selectRow(row: string){
    this.selectedRow = row;
  }

  selectCell(cell: string){
  //  this.selectedCell = cell;
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
    /*
    this.uncheckAll();
    for(var i=0;i<this.bookings.length;i++){
        this.selectedRows.push(this.bookings[i].BookingID);
    }
    */
  }

  uncheckAll(){
//    this.selectedRows.splice(0,this.selectedRows.length);
  }

  isSomeChecked(){
    /*
    if(
      this.selectedRows.length>0 &&
      this.selectedRows.length!=this.bookings.length
    ){
      return true;
    }else{
      return false;
    }
    */
  }




  sortBy(fieldName: string){
    
    switch(fieldName){

      case "BookingID" : 
        this.bookings = this.bookings.map(
          (data) => {
            data.sort((a,b) => {
              var x = a.BookingID.toLowerCase();
              var y = b.BookingID.toLowerCase();
              return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            return data;
          }
        );
      break;
   
    }

  }



}
