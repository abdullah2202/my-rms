import { Component, OnInit } from '@angular/core';

import { IBooking } from '../booking';
import { BookingService } from '../booking.service';

import { PagerService } from '../../services/pager.service';

import {MatButtonModule} from '@angular/material/button';
//import { MaterialAppModule } from '../../material.module';

/**
 * Component
 */
@Component({
  selector: 'booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

  data: IBooking[];
  allData: IBooking[];
  errorMessage: string;

  primaryField = 'BookingID';

  headers = [];

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
  filterFields: any = [
    'BookingID',
    'Username',
    'CustomerName',
    'StoreName',
    'StatusName'
  ];
  
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
      .subscribe(d => {
        this.data = d.data;
        this.allData = d.data;
        this.headers = d.headers;
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
    this.pager = this.pagerService.getPager(this.data.length, this.currentPage, this.itemsPerPageSelected);

    // get current page of items
    this.pagedItems = this.data.slice(this.pager.startIndex, this.pager.endIndex + 1);


  }

  filterResults(filter: any){
    if(filter){
      this.data = this.allData;
      this.data = this.data.filter((item) => {
        let match = true;

        for(var i = 0; i < this.filterFields.length; i++){
          match = this.checkMatch(filter, item[this.filterFields[i]]);
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
    this.data = this.allData;
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
    console.log(i);
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
    for(var i=0;i<this.data.length;i++){
        this.selectedRows.push(this.data[i][this.primaryField]);
    }
  }

  uncheckAll(){
    this.selectedRows.splice(0,this.selectedRows.length);
  }

  isSomeChecked(){
    if(
      this.selectedRows.length>0 &&
      this.selectedRows.length!=this.data.length
    ){
      return true;
    }else{
      return false;
    }
  }




  sortBy(fieldName: string = this.primaryField){
    
    // Invert sorting direction variable
    this.sortAsc = !this.sortAsc;

    // Sort the array
    this.data.sort((a,b) => {
      var x = a[fieldName].toLowerCase();
      var y = b[fieldName].toLowerCase();
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

    // Invert sorting direction
    if(!this.sortAsc){
      this.data.reverse();
    }

    // Refresh the view
    this.setPage(this.currentPage);
    
  }


  

}
