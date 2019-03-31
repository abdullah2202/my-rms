import { Component } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


title = 'RMS APP';
activeMenuItem = "";
activeSubMenuItem="";

/**
 * Toggles visibility of activated sub menu
 * @param item 
 */
activateMenuItem(item: string){
  if(this.activeMenuItem==item){
    this.activeMenuItem = "";
  }else{
    this.activeMenuItem = item;
  }
}

activateSubMenuItem(item: string){
  if(this.activeSubMenuItem==item){
    this.activeSubMenuItem = "";
  }else{
    this.activeSubMenuItem = item;
  }
}



ngOnInit(): void {
  $('.has-submenu>a').click(function(){
    $(this).siblings('.submenu').slideToggle();
    $(this).parent().toggleClass("active");
  });
}



}
