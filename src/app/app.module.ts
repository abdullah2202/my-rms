import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutesModule } from './/app-routes.module';

// Common Services
import { ApiService } from './services/api.service';
import { PagerService } from './services/pager.service';

// Individual Services
import { BookingService } from './booking/booking.service';
import { CustomerService } from './customer/customer.service';

// Modules
import { BookingModule } from './booking/booking.module';
import { CustomerModule } from './customer/customer.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
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
    CustomerService,
    PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
