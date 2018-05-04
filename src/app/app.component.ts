import { Component } from '@angular/core';

import { BookingModule } from './booking/booking.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  ngOnInit(): void {
    
  }
}
