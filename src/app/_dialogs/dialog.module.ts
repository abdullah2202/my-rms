import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dialog } from './dialog.component';
import { CustomerEdit } from './customeredit.component';
import { MaterialAppModule } from '../material.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialAppModule
  ],
  declarations: [
    Dialog,
    CustomerEdit
  ],
  exports: [
    Dialog,
    CustomerEdit
  ]
})
export class DialogModule { }
