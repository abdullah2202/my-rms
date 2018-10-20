import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component'

import { BookingListComponent } from './booking/booking-list.component';
import { BookingDetailComponent } from './booking/booking-detail.component';

import { CustomerListComponent } from './customer/customer-list.component';
import { CustomerDetailComponent } from './customer/customer-detail.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'bookings/completed', component: BookingListComponent, data: {sort: 'completed'} },
  { path: 'bookings/cancelled', component: BookingListComponent, data: {sort: 'cancelled'} },
  { path: 'bookings/processing', component: BookingListComponent, data: {sort: 'processing'} },
  { path: 'bookings/awaiting-action', component: BookingListComponent, data: {sort: 'awaiting action'} },
  { path: 'bookings/awaiting-parts', component: BookingListComponent, data: {sort: 'awaiting parts'} },
  { path: 'bookings', component: BookingListComponent },
  { path: 'bookings/:id', component: BookingDetailComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/:id', component: CustomerDetailComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [ RouterModule ]
})
export class AppRoutesModule { }
