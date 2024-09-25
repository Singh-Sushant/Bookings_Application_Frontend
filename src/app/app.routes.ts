import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path : '',
        component : MainPageComponent
    },
    {
        path : 'booking',
        component : BookingFormComponent
    }
];
