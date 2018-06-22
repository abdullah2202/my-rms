import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialAppModule } from '../material.module';

import { BookingListComponent } from './booking-list.component';
import { BookingDetailComponent } from './booking-detail.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialAppModule
  ],
  declarations: [
    BookingListComponent,
    BookingDetailComponent
  ]
})
export class BookingModule { }
