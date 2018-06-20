import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialAppModule } from '../material.module';
import { CustomerListComponent } from './customer-list.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialAppModule
  ],
  declarations: [CustomerListComponent]
})
export class CustomerModule { }
