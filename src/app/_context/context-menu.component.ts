import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContextMenuService, IContextClickEvent } from './context-menu.service';

@Component({
    selector: 'app-contextmenu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

private subscription: Subscription = new Subscription();

constructor(
    private _contextMenuService: ContextMenuService
){
    // Subscribe to subject in service
    this.subscription.add(_contextMenuService.show.subscribe(menuEvent => {
        this.onMenuEvent(menuEvent);
    }));
}

ngOnInit(){
    
}

onMenuEvent(menuEvent: IContextClickEvent){
    console.log('Menu Event', menuEvent);
}


}
