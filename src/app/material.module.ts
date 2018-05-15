import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  /*
  imports: [...modules],
  exports: [...modules]
  */
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialAppModule { 

}