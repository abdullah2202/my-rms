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
// import { ContextMenuService } from './services/context.service';

// Modules
import { BookingModule } from './booking/booking.module';
import { CustomerModule } from './customer/customer.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableListComponent } from './table/table-list.component';
// import { ContextMenuComponent } from './context/context-menu.component';


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
    DashboardComponent,
    TableListComponent
    // ContextMenuComponent
  ],
  providers: [
    ApiService,
    BookingService,
    CustomerService,
    PagerService
    // ContextMenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
