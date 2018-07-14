import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialAppModule } from '../material.module';

// Directive
import { DirectivesModule } from '../_directives/directives.module';

import { BookingListComponent } from './booking-list.component';
import { BookingDetailComponent } from './booking-detail.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialAppModule,
    DirectivesModule
  ],
  declarations: [
    BookingListComponent,
    BookingDetailComponent
  ] 
})
export class BookingModule { }
