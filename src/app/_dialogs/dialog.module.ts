import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dialog } from './dialog.component';
import { MaterialAppModule } from '../material.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialAppModule
  ],
  declarations: [
    Dialog
  ],
  exports: [
    Dialog
  ]
})
export class DialogModule { }
