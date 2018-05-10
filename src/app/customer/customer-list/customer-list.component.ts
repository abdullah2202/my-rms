import { Component, OnInit } from '@angular/core';

import { ICustomer } from '../customer';
import { CustomerService } from '../customer.service';

import { PagerService } from '../../services/pager.service';


@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  // Array of Customers
  customers: ICustomer[];

  // Error Messages
  errorMessage: string;

  // Selections
  selectedRows = [];                // Stores an array of selected rows
  selectedCell: string = '';        // Selected Cell - to be used for inline editing

  // Pagination
  pager: any = {};
  pagedItems: any[];
  currentPage: number = 1;
  itemsPerPage = [25,
                  50,
                  100,
                  250,
                  500];
  itemsPerPageSelected = 25;

  // Sorting
  sortAsc: boolean = false;
  sortField: string = 'CustomerID';

  colPos = {
    'CustomerID':{
      width: '150px'
    },
    'Name':{
      width: '150px'
    },
    'Store':{
      width: '150px'
    },
    'Address1':{
      width: '250px'
    },
    'Address2':{
      width: '150px'
    }
  };


  constructor(
    private customerService: CustomerService,
    private pagerService: PagerService
  ) { }

  ngOnInit() {
    this.getCustomers();
  }


  getCustomers(pageNum? : number){
    this.customerService.getCustomers()
      .subscribe(customers => {
        this.customers = customers;
      },
      error => this.errorMessage = <any>error
      );
  }

  setPage(page: number = 1) {
    
    this.currentPage = page;

    if (this.currentPage < 1 || (this.pager.totalPages > 0 && page > this.pager.totalPages)) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.customers.length, this.currentPage, this.itemsPerPageSelected);

    // get current page of items
    this.pagedItems = this.customers.slice(this.pager.startIndex, this.pager.endIndex + 1);
    
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
      for(var i=0;i<this.customers.length;i++){
          this.selectedRows.push(this.customers[i].CustomerID);
      }
    }
  
    uncheckAll(){
      this.selectedRows.splice(0,this.selectedRows.length);
    }
  
    isSomeChecked(){
      if(
        this.selectedRows.length>0 &&
        this.selectedRows.length!=this.customers.length
      ){
        return true;
      }else{
        return false;
      }
    }

    sortBy(fieldName: string = 'CustomerID'){
    
      // Invert sorting direction variable
      this.sortAsc = !this.sortAsc;
  
      // Sort the array
      this.customers.sort((a,b) => {
        var x = a[fieldName].toLowerCase();
        var y = b[fieldName].toLowerCase();
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
  
      // Invert sorting direction
      if(!this.sortAsc){
        this.customers.reverse();
      }
  
      // Refresh the view
      this.setPage(this.currentPage);
      
    }

}
