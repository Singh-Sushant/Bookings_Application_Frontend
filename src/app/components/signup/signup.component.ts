import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  phoneNumber: string = '';
  signupSuccess: string = '';
  emailAlreadyTaken : boolean = false;

  constructor(private master: MasterService , private router : Router) {}

  onSignup(): void {
    const signupData = {
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber
    };
    if(this.phoneNumber.length != 10){
      alert("Cannot Signup Phone number not correct");
      return;
    }

    this.master.registerUser(signupData).subscribe(
      response => {
        console.log('Signup successful', response);
        this.signupSuccess = 'success';
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 1000);
      },
      error => {
        
        console.error('Signup failed', error);
        if(error.error.message){
          this.signupSuccess = "emailTaken"
          return
        }
        else{

          this.signupSuccess = 'failure';
        }
      }
    );

  }

  goToLogin():void{
    this.router.navigate(['/login'])
  }
}
