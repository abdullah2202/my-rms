import { Directive, HostListener, Input } from '@angular/core';
import { ContextMenuService } from '../_context/context-menu.service';

@Directive({
  selector: '[contextmenu]'
})
export class ContextMenuDirective {
  @Input() public contextMenuSubject: any;

  constructor(private contextMenuService: ContextMenuService) { 
    
  }

    // Context Menu 
    @HostListener('contextmenu',['$event'])
    public onContextMenu(event: MouseEvent){

      // Trigger subject change on service
      this.contextMenuService.show.next({
        // Format of IConectClickEvent - defined in context-menu.service

        // ContextMenuSubject - What type of data, e.g. bookings, customers, payments
        contextMenuSubject: this.contextMenuSubject,

        // Mouse/Keyboard Event
        event
        
      });

      // Prevent default actions of context menu event
      event.preventDefault();
      event.stopPropagation();
    }


}