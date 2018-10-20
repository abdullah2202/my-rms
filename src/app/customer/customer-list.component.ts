import { Component, OnInit } from '@angular/core';
import { ICustomer } from './customer';
import { CustomerService } from './customer.service';
import { PagerService } from '../services/pager.service';
// import { ContextMenuComponent } from '../context/context-menu.component';
import {TableListComponent} from '../table/table-list.component';


@Component({
  selector: 'customer-list',
  templateUrl: '../table/table-list.component.html',
  styleUrls: ['../table/table-list.component.scss']
})
export class CustomerListComponent extends TableListComponent implements OnInit {

  // Array of Customers
  data: ICustomer[];
  allData: ICustomer[];

  // Primary field for Data
  primaryField = 'CustomerID' 

  sortField = 'CustomerID'

  filterFields: any = [
    'CustomerID',
    'Name',
    'Address1'
  ];

  constructor(
    private customerService: CustomerService,
    protected pagerService: PagerService
    // protected contextMenu: ContextMenuComponent
  ) { 
    super(pagerService
      // , contextMenu
    ); 
  }

  ngOnInit() {

    this.customerService.initialGetAll();

    // Set headers from service
    this.customerService.headers.subscribe(headers => {
      this.headers = headers;
    });

    this.customerService.customers.subscribe(customers => {
      this.data = customers;
      this.allData = customers;

      this.setPage(1);
    });

    

  }

}
