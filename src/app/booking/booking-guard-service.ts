import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { BookingDetailComponent } from './booking-detail.component';


@Injectable()
export  class BookingEditGuard implements CanDeactivate<BookingDetailComponent> {

    canDeactivate(component: BookingDetailComponent): boolean {
        /* if (component.customerForm.dirty) {
            let customerName = component.customerForm.get('firstName').value || 'New Customer';
            return confirm(`Navigate away and lose all changes to ${customerName}?`);
        } */
        return true;
    }
}
