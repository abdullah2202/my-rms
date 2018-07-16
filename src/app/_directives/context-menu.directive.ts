import { Directive, HostListener, Input } from '@angular/core';
import { ContextMenuService } from '../_context/context-menu.service';

@Directive({
  selector: '[contextmenu]'
})
export class ContextMenuDirective {
  @Input() public contextMenuSubject: any;

  constructor(private contextMenuService: ContextMenuService) { 
    
  }

  
    @HostListener('contextmenu',['$event'])
    public onContextMenu(event: MouseEvent){

      // Trigger subject change on service
      this.contextMenuService.show.next({
        contextMenuSubject: this.contextMenuSubject,
        event
      });

      event.preventDefault();
      event.stopPropagation();
    }


}