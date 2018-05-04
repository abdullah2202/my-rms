import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookingListComponent } from './booking/booking-list/booking-list.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { CustomerListComponent } from './customer/customer-list/customer-list.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'bookings', component: BookingListComponent },
  { path: 'customers', component: CustomerListComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutesModule { }
