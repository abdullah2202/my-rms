import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutesModule } from './/app-routes.module';

//Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialAppModule } from './material.module';

// Common Services
import { ApiService } from './services/api.service';
import { PagerService } from './services/pager.service';
import { SettingsService } from './services/settings.service';
import { ContextMenuService } from './_context/context-menu.service';

// Individual Services
import { BookingService } from './booking/booking.service';
import { CustomerService } from './customer/customer.service';

// Modules
import { ContextMenuModule } from './_context/context-menu.module';
import { TableListComponent } from './table/table-list.component';
import { BookingModule } from './booking/booking.module';
import { CustomerModule } from './customer/customer.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableModule } from './_table/table.module';

//Dialogs
import { DialogModule } from './_dialogs/dialog.module';

// Directive
import { DirectivesModule } from './_directives/directives.module';

import { Dialog } from './_dialogs/dialog.component';
import { CustomerEdit } from './_dialogs/customeredit.component';
import { MAT_DATE_LOCALE } from '@angular/material';
import { SideMenuComponent } from './menu/side-menu/side-menu.component';



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
    ContextMenuModule,
    DialogModule,
    TableModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    TableListComponent,
    SideMenuComponent
  ],
  providers: [
    ApiService,
    BookingService,
    CustomerService,
    PagerService,
    SettingsService,
    ContextMenuService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  entryComponents: [
    Dialog, 
    CustomerEdit
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
