import { NgModule } from '@angular/core';

// Directive
import { ContextMenuDirective } from './context-menu.directive';


@NgModule({
  declarations: [
    ContextMenuDirective
  ],
  exports: [
    ContextMenuDirective
  ]
}) 
export class DirectivesModule { }
