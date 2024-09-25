import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-user-bookings',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-bookings.component.html',
  styleUrl: './user-bookings.component.css'
})
export class UserBookingsComponent {
  master = inject(MasterService)
  userEmail : string = "";
  userEventDetails:any;
  dataRecieved = false;

  getEventsForUser(){
    this.master.getEventsForUser(this.userEmail).subscribe((res:any)=>{
      this.userEventDetails = res;
      console.log(this.userEventDetails);
      this.dataRecieved = true;
    },error=>{
      this.userEventDetails = null ;
    });
  }
}
