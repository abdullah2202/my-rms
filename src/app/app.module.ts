import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialAppModule } from './material.module';


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
import { TableListComponent } from './table/table-list.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialAppModule,
    BrowserAnimationsModule,
    BookingModule,
    CustomerModule,
    AppRoutesModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent
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
