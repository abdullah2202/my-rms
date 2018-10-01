import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
    selector: 'dialog-datechange',
    templateUrl: './datechange.component.html',
    styleUrls: ['./datechange.component.scss']
  })
  export class Datechange {
  
    id: string;
    title: string;

    constructor(
      public dialogRef: MatDialogRef<Datechange>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
        this.id = data.id;
        this.title = data.title;
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    save(): void {
      this.dialogRef.close({id:123,title:'sample',id2:this.id,title2:this.title});
    }
  
  }