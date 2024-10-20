import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-phone',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './change-phone.component.html',
  styleUrl: './change-phone.component.css'
})
export class ChangePhoneComponent {
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
          
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);  // Redirect after 1 seconds
        },
        (error : any) => {
          console.error('Error updating phone number:', error);
          this.setAlert('Failed to update phone number. Please try again.', 'danger');
        }
      );
  }

    





    setAlert(message: string, type: string) {
      this.alertMessage = message;
      this.alertType = type;
    }

}
