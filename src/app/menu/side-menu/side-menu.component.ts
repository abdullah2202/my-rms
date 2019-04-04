import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.has-submenu>a').click(function(){
      $(this).siblings('.submenu').slideToggle();
      $(this).parent().toggleClass("active");
    });
  }

}
