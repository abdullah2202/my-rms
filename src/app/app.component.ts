import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


title = 'RMS APP';
activatedMenuItem = "";

/**
 * Toggles visibility of activated sub menu
 * @param item 
 */
activateMenuItem(item: string){
  if(this.activatedMenuItem==item){
    this.activatedMenuItem = "";
  }else{
    this.activatedMenuItem = item;
  }
  
}

ngOnInit(): void {
  
}



}
