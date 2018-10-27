import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ICustomer } from './customer'
import { CustomerService } from './customer.service';
// import { SettingsService } - TODO: Service for getting settings and lists
import { MatDialog, MatDialogConfig } from '@angular/material';

// Dialogs
import { Dialog } from '../_dialogs/dialog.component';

@Component({
    selector: 'customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

customerCommsData = [];
customerCommsHeaders = [];

jobsData = [];
jobsHeaders = [];

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

    this.customerCommsHeaders.push({name:'Date',field:'date',width:'30'});
    this.customerCommsHeaders.push({name:'Content',field:'content', width: '70'});
    this.testAdd();


    this.jobsHeaders.push({name:'Job ID',field:'jobID',width:'15'});
    this.jobsHeaders.push({name:'Model',field:'model',width:'20'});
    this.jobsHeaders.push({name:'Serial',field:'serial',width:'30'});
    this.jobsHeaders.push({name:'Problem',field:'problem',width:'35'});

    this.jobsData.push({jobID:'0001',model:'Apple iPhone XS',serial:'3543231231',problem:'LCD'});
    this.jobsData.push({jobID:'0002',model:'Apple iPhone 6',serial:'3543231231',problem:'LCD'});
    this.jobsData.push({jobID:'0003',model:'Samsung S7',serial:'3543231231',problem:'LCD'});
    this.jobsData.push({jobID:'0004',model:'Samsung Tablet',serial:'3543231231',problem:'LCD'});
    this.jobsData.push({jobID:'0005',model:'Apple iPad Air',serial:'3543231231',problem:'LCD'});

}

testAdd(){
    this.customerCommsData.push({date:'Today',content:'Made Final call'});
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
