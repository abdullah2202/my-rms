import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[contextmenu]'
})
export class ContextMenuDirective {

  constructor(el: ElementRef) { 
    el.nativeElement.style.background = 'red';
  }

  
    @HostListener('contextmenu',['$event'])
    public onContextMenu(event: MouseEvent){

        console.log('Context Menu Triggered'); 
        console.log(event);

        event.preventDefault();
        event.stopPropagation();
    }


}