import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { NgModule } from '@angular/core';
import { UserBookingsComponent } from './components/user-bookings/user-bookings.component';

export const routes: Routes = [
    {
        path : '',
        component : MainPageComponent
    },
    {
        path : 'booking',
        component : BookingFormComponent
    },
    {
        path : 'userEvents',
        component:UserBookingsComponent
    }
];
