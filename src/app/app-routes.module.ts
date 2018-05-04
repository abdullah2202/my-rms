import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookingListComponent } from './booking/booking-list/booking-list.component';


const routes: Routes = [
  { path: 'bookings', component: BookingListComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutesModule { }
