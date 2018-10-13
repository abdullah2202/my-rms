import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CustomerService } from "../customer/customer.service";

@Component({
    selector: 'customeredit-dialog',
    templateUrl: './customeredit.component.html',
    styleUrls: ['./customeredit.component.scss']
  })
  export class CustomerEdit {
  
    id: string;
    title: string;


    /**
     * Connect to api service and pull data according to CustomerID supplied
     */

    constructor(
      private customerService: CustomerService,
      public dialogRef: MatDialogRef<CustomerEdit>,
      @Inject(MAT_DIALOG_DATA) public data: any
      ) {
        // this.id = data.id;
        // this.title = data.title;
        console.log(data);
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    save(): void {
      this.dialogRef.close({});
    }
  
  }