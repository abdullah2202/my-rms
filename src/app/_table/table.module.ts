import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Table } from './table.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Table
  ],
  exports: [
    Table
  ]
})
export class TableModule { }