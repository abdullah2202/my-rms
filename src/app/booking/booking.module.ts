import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialAppModule } from '../material.module';

import { BookingListComponent } from './booking-list/booking-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BookingListComponent]
})
export class BookingModule { }
