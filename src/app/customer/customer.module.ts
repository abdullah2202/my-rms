import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialAppModule } from '../material.module';

// Directive
import { DirectivesModule } from '../_directives/directives.module';
import { ContextMenuModule } from '../_context/context-menu.module';

import { CustomerListComponent } from './customer-list.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialAppModule,
    DirectivesModule,
    ContextMenuModule
  ],
  declarations: [CustomerListComponent]
})
export class CustomerModule { }
