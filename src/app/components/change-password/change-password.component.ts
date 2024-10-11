import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  alertMessage: string = '';
  alertType: string = ''; // 'success' or 'danger'

  localStorageValues: {
    bookingEmail: string | null
  } = {
    bookingEmail: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private master: MasterService
  ) {}

  ngOnInit(): void {
    this.localStorageValues.bookingEmail = localStorage.getItem('bookingEmail');
  }


  validatePassword(): boolean {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#]).{6,}$/;
    return passwordPattern.test(this.newPassword);
  }



  onSubmit() {

    if (!this.validatePassword()) {
      this.setAlert('Password must contain at least 6 characters, one uppercase, one lowercase, one digit, and one special character.', 'danger');
      return;
    }

    const email = this.localStorageValues.bookingEmail;
    if (!email) {
      alert('User email not found. Please log in again.');
      this.router.navigate(['/login']);
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.setAlert('New passwords do not match', 'danger');
      return;
    }

    const updateData = {
      Email: email,
      CurrentPassword: this.currentPassword,
      NewPassword: this.newPassword
    };

    this.master.updatePassword(updateData).subscribe(
      (response) => {
        
        this.setAlert('Password updated successfully', 'success');
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      },
      (error: any) => {
        console.error('Error updating password:', error);
        this.setAlert('Failed to update password. Please try again.', 'danger');
      }
    );
  }

  setAlert(message: string, type: string) {
    this.alertMessage = message;
    this.alertType = type;
  }
}
