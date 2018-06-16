import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialAppModule } from '../material.module';

import { BookingListComponent } from './booking-list.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialAppModule
  ],
  declarations: [BookingListComponent]
})
export class BookingModule { }
