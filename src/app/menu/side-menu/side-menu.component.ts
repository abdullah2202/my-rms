import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  activatedMenuItem = "";

  constructor() {}
  ngOnInit() {}

  activateMenuItem(item: any){

    // Get name from data-name attribute
    var name = item.target.attributes['data-name'].value;

    console.log(name);

    // Close all parent menu items
    $('ul.submenu').slideUp();

    // If closing the menu
    if(this.activatedMenuItem==name){

      // Set var to empty - None selected
      this.activatedMenuItem="";

    // Opening Menu
    }else{

      // Set var to selected menuItem name
      this.activatedMenuItem=name;

      // Siblings of selected anchor to slideDown() - JQuery
      $("a[data-type='parent-menu'][data-name="+name+"]").siblings('ul.submenu').slideDown();
    }
  }

}
