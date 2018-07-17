import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { ContextMenuService, IContextClickEvent } from './context-menu.service';
import { BookingService } from '../booking/booking.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-contextmenu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

private subscription: Subscription = new Subscription();

// private  

constructor(
    private _contextMenuService: ContextMenuService,
    private _bookingService: BookingService
){
    // Subscribe to subject in service
    this.subscription.add(_contextMenuService.show.subscribe(menuEvent => {
        this.onMenuEvent(menuEvent);
    }));
}

ngOnInit(){
    
}

// On Context Menu
onMenuEvent(menuEvent: IContextClickEvent){

    // Separate menuEvent 
    const {contextMenuSubject, event} = menuEvent;

    // console.log('Menu Event', menuEvent);
    console.log('ContextMenuSubject: ' + contextMenuSubject);
}


}
