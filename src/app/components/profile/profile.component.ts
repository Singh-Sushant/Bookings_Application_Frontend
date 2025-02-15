import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  phoneNumber: string = '';
  
  alertMessage: string = '';
  alertType: string = '';  // 'success' or 'danger'

  localStorageValues : {
    bookingPhone : string|null,
    bookingEmail : string|null
  } = {
    bookingPhone : "",
    bookingEmail : ""
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private master: MasterService
  ) {}

  ngOnInit(): void {
    this.localStorageValues.bookingEmail = localStorage.getItem('bookingEmail')
    this.localStorageValues.bookingPhone = localStorage.getItem('bookingPhoneNumber')
  }

  onSubmit() {
    const email = localStorage.getItem('bookingEmail');
    if (!email) {
      alert('User email not found. Please log in again.');
      this.router.navigate(['/login']);
      return;
    }

    const updateData = {
      PhoneNumber: this.phoneNumber,
      Email: email
    };

    
   
    this.master.updatePhone(updateData)
      .subscribe(
        (response) => {
          this.setAlert('Phone number updated successfully', 'success');
          localStorage.setItem('bookingPhoneNumber', this.phoneNumber);
          // Optionally redirect after a delay
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);  // Redirect after 2 seconds
        },
        (error) => {
          console.error('Error updating phone number:', error);
          this.setAlert('Failed to update phone number. Please try again.', 'danger');
        }
      );
  }

    

  goToChangePhone(){
    this.router.navigate(['/change-phone'])
  }
  
  goToChangePassword(){

    this.router.navigate(['/change-password'])
  }




    setAlert(message: string, type: string) {
      this.alertMessage = message;
      this.alertType = type;
    }
  }
