import { Component, OnInit } from '@angular/core';

import { ICustomer } from '../customer';
import { CustomerService } from '../customer.service';

import { PagerService } from '../../services/pager.service';

import {TableListComponent} from '../../table/table-list.component';

@Component({
  selector: 'customer-list',
  templateUrl: '../../table/table-list.component.html',
  styleUrls: ['../../table/table-list.component.scss']
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
  ) { 
    super(pagerService)
  }

  ngOnInit() {
    this.getCustomers();
  }


  getCustomers(pageNum? : number){
    this.customerService.getCustomers()
      .subscribe(d => {
        this.data = d.data;
        this.allData = d.data;
        this.headers = d.headers;
        this.setPage(1);
      },
      error => this.errorMessage = <any>error
      );
  }

}
