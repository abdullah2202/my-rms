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
import { SettingsService } from './services/settings.service';
import { ContextMenuService } from './_context/context-menu.service';

// Individual Services
import { BookingService } from './booking/booking.service';
import { CustomerService } from './customer/customer.service';
// import { ContextMenuService } from './services/context.service';

// Modules
import { ContextMenuModule } from './_context/context-menu.module';
import { TableListComponent } from './table/table-list.component';
import { BookingModule } from './booking/booking.module';
import { CustomerModule } from './customer/customer.module';
import { DashboardComponent } from './dashboard/dashboard.component';

// Directive
import { DirectivesModule } from './_directives/directives.module';
 

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialAppModule,
    BrowserAnimationsModule,
    BookingModule,
    CustomerModule,
    AppRoutesModule,
    HttpClientModule,
    DirectivesModule,
    ContextMenuModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    TableListComponent
  ],
  providers: [
    ApiService,
    BookingService,
    CustomerService,
    PagerService,
    SettingsService,
    ContextMenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
