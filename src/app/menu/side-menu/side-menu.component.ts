import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  activatedMenuItem = "";

  constructor() { }

  ngOnInit() {

    $('.has-submenu>a').click(function(){
      // $(this).siblings('.submenu').slideToggle();
      // $(this).parent().toggleClass("active");
    });

  }

  test(item: object){
    // console.log(item.target.attributes['data-test-data'].value);
    // console.log();
    $("a[data-type='parent-menu'").siblings('ul.submenu').slideDown();
  }

  activateMenuItem(item: any){

    // Get name from data-name attribute
    var name = item.target.attributes['data-name'].value;

    console.log(name);

    // Close all parent menu items
    $('ul.submenu').slideUp();

    // If closing the menu
    if(this.activatedMenuItem==name){
      this.activatedMenuItem="";

    // Opening Menu
    }else{
      this.activatedMenuItem=name;
      $("a[data-type='parent-menu'][data-name="+name+"]").siblings('ul.submenu').slideDown();
    }
  }

}
