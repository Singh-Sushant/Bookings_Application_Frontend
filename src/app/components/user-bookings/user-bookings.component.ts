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
  userEmail : string | null = "";
  userEventDetails:any;
  dataRecieved = false;
  


  ngOnInit():void{
    this.userEmail = localStorage.getItem('bookingEmail') ;
    this.getEventsForUser();
  }

  getEventsForUser(){
    this.master.getEventsForUser(this.userEmail).subscribe((res:any)=>{
      this.userEventDetails = res;
      console.log(this.userEventDetails);
      this.dataRecieved = true;
    },error=>{
      this.userEventDetails = null ;
    });
  }

  cancelBooking(id : string){
    
    var value = confirm('Do you want to cancel this booking ? ')
    if(value == true){
      this.master.cancelBooking(id).subscribe((res:any)=>{
        console.log(res);
        
      });
      location.reload();
    }
    else{
      
    }
    
  }
}
