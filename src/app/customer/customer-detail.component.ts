import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ICustomer } from './customer'
import { CustomerService } from './customer.service';
// import { SettingsService } - TODO: Service for getting settings and lists
import { MatDialog, MatDialogConfig } from '@angular/material';

// Dialogs
import { Dialog } from '../_dialogs/dialog.component';

import { Table } from '../_table/table.component';

@Component({
    selector: 'customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

someData: string = 'Some data to be placed here';

// Customer Object TODO: Create empty Object when creating new Customer
customer: ICustomer;
customerID = '';

// Boolean for when data is loading
loadingData = false;


dialogConfig = new MatDialogConfig();

isChanged = false;

constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private dialog: MatDialog
){
    this.route.params.subscribe(params => {this.customerID = params.id});
    this.customer = this.customerService.initCustomer();
}

ngOnInit(){
    
    // Get customer from service
    this.customerService.getCustomer(this.customerID);     // ?? Redundent ?? 

    this.customerService.customers.subscribe(data => {
        data.forEach((item, index) => {
            if(this.customerID == item.CustomerID){
                this.customer = data[index];
                console.log(this.customer);
            }
        });
    });

    // Dialog Configuration Defaults
    this.dialogConfig.width = '60vw';
    this.dialogConfig.data = {};
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;

}

parseDate(date){
    return new Date(date);
}

canDeactivate() {
    return this.isChanged;
}

/**
 * Test Open Dialog
 */
openDialog(){
    
    this.dialogConfig.data = {id: 123, title: 'Test Dialog'};

    const dialogRef = this.dialog.open(Dialog, this.dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
        console.log('Result: ', data);
    });
}


/**
 * Back Button - Go back to listings
 */
goBack(){
    this.router.navigate(['customers']);
}

}
