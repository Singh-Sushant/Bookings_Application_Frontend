import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { UserBookingsComponent } from './components/user-bookings/user-bookings.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePhoneComponent } from './components/change-phone/change-phone.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainPageComponent },
  { path: 'booking', component: BookingFormComponent, canActivate: [AuthGuard] },
  { path: 'userEvents', component: UserBookingsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent }, 
  {path : 'change-password' , component:ChangePasswordComponent},
  {path : 'change-phone' , component : ChangePhoneComponent}, // wildcard route for any unknown routes, redirects to main page
  { path: '**', redirectTo: '/main' }
];

export default routes;
