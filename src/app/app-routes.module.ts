import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component'

import { BookingListComponent } from './booking/booking-list.component';
import { BookingDetailComponent } from './booking/booking-detail.component';

import { CustomerListComponent } from './customer/customer-list.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'bookings', component: BookingListComponent },
  { path: 'bookings/processing', component: BookingListComponent, data: {sort: 'processing'} },
  { path: 'bookings/:id', component: BookingDetailComponent },
  { path: 'customers', component: CustomerListComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [ RouterModule ]
})
export class AppRoutesModule { }
