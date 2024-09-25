import { Component, inject, OnInit } from '@angular/core';
import { IEvent } from '../../model/interface/event';
import { DataSharingService } from '../../services/data-sharing.service';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../services/master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit{
  eventDetails !: IEvent
  master = inject(MasterService)

  username: string = ''; // Input for user's name
  email: string = ''; // Input for user's email
  phoneNumber : number = 0;
  numberOfTickets: number = 1; // Input for number of tickets
  eventId : string = ""

  bookingSuccessfull : string = ""
  // totalPriceToDisplay : number = 0;
  constructor(private dataSharing : DataSharingService){
   
  }

  ngOnInit(): void {
    
    this.eventDetails = this.dataSharing.sharedData
    // console.log(this.eventDetails);
    console.log(this.eventDetails.id);
    
    
    this.eventId = this.eventDetails.id
    // this.totalPriceToDisplay = this.eventDetails.ticketPrice * this.numberOfTickets
    
  }
  
  onSubmit(): void {

    // console.log(this.eventDetails);
    
    const bookingData = {
      username: this.username,
      email: this.email,
      numberOfTickets: this.numberOfTickets,
      phoneNumber : this.phoneNumber,
      totalPrice : this.numberOfTickets*this.eventDetails.ticketPrice,
      eventId : this.eventId
    };
    

    console.log(bookingData);
    
    
    this.master.bookEvent(bookingData).subscribe(
      response => {
        console.log('Booking successful!', response);
        this.bookingSuccessfull = 'successfull'
        // Handle success (e.g., navigate to confirmation page)
      },
      error => {
        console.error('Error booking event', error);
        // Handle error (e.g., show an error message)
        this.bookingSuccessfull = 'not'
      }
    );
  }
}