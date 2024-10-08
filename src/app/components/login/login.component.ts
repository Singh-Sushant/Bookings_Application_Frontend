import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginSuccess: string = '';

  constructor(private master: MasterService , private router : Router) {}

  onLogin(): void {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.master.loginUser(loginData).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        localStorage.setItem('jwtToken', response.token);
        localStorage.setItem('bookingEmail', response.email);
        localStorage.setItem('bookingPhoneNumber', response.phoneNumber);
        this.loginSuccess = 'success';
      },
      error => {
        console.error('Login failed', error);
        this.loginSuccess = 'failure';
      }
    );


    
  }


  goToSignup():void{
    this.router.navigate(['/signup'])
  }
}
