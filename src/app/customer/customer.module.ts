import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialAppModule } from '../material.module';

// Directive
import { DirectivesModule } from '../_directives/directives.module';
import { ContextMenuModule } from '../_context/context-menu.module';
import { TableModule } from '../_table/table.module';

import { CustomerListComponent } from './customer-list.component';
import { CustomerDetailComponent } from './customer-detail.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialAppModule,
    DirectivesModule,
    ContextMenuModule,
    TableModule
  ],
  declarations: [
    CustomerListComponent,
    CustomerDetailComponent
  ]
})
export class CustomerModule { }
