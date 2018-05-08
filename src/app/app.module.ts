import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutesModule } from './/app-routes.module';

import { ApiService } from './services/api.service';
import { PagerService } from './services/pager.service';

import { BookingService } from './booking/booking.service';

import { BookingModule } from './booking/booking.module';
import { CustomerModule } from './customer/customer.module';
//import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
//    CustomerListComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BookingModule,
    CustomerModule,
    AppRoutesModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    BookingService,
    PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
