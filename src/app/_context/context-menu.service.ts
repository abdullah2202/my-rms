import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


// Interfaces

export interface IContextClickEvent{
    // Context Menu
    contextMenuSubject?: string;
    event?: MouseEvent | KeyboardEvent;
}


// Service

@Injectable()
export class ContextMenuService {

    // Create a behaviour Subject
    public show: Subject<IContextClickEvent> = new Subject();




constructor() { }

}
