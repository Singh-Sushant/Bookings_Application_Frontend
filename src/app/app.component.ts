import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { MainPageComponent } from "./components/main-page/main-page.component";
import { routes } from './app.routes';
import { BookingFormComponent } from './components/booking-form/booking-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainPageComponent , BookingFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


}
