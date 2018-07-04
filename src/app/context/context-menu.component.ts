import { Component, OnInit } from '@angular/core';


/**
 * Component 
 */
@Component({
  selector: 'context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

isOpen = false;
contextX = 200;
contextY = 200;



ngOnInit(): void{

}

openMenu(e: MouseEvent){
    e.preventDefault();
    console.log(e);
    console.log('Context Menu');
    this.isOpen = true;
}

closeMenu(){
    this.isOpen = false;
}


}