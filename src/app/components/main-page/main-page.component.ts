import { Component, inject, OnInit } from '@angular/core';
import { IEvent, ITicketType } from '../../model/interface/event';
import { MasterService } from '../../services/master.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../../services/data-sharing.service';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {

  constructor(private dataSharing : DataSharingService , private router : Router){
  }

  master = inject(MasterService)


  loggedIn : boolean = false;

  loader : boolean = true;
  allEvents : IEvent[] = []
  currentImageIndex: number[] = []; 
  userInitial: string = '';
  showUserMenu: boolean = false;

  ngOnInit(): void {
    this.master.getAllEvents().subscribe((res : IEvent[])=>{
      console.log(res);
      
      this.allEvents = res
      this.currentImageIndex = new Array(res.length).fill(0); // Initializes to 0 for each event
      this.loader = false;
    },error=>{
      alert("problem with apI")
      this.loader = false;
    });

    if(localStorage.getItem('jwtToken') != null){
      this.loggedIn = true;
      const userEmail= localStorage.getItem('bookingEmail');
      if (userEmail) {
        this.userInitial = userEmail.charAt(0).toUpperCase();
      }
    }
    
  }

  prevImage(index: number) {
    this.currentImageIndex[index] = (this.currentImageIndex[index] - 1 + this.allEvents[index].eventImage.length) % this.allEvents[index].eventImage.length;
  }

  // Changed: Modified nextImage method to take an index
  nextImage(index: number) {
    this.currentImageIndex[index] = (this.currentImageIndex[index] + 1) % this.allEvents[index].eventImage.length;
  }

  navigateToUrl(){
    this.router.navigate(['/userEvents'])
  }




  onBookClicked(){
    
  }



  // onBookClicked(event : IEvent){
  //   this.dataSharing.sharedData = event;
  //   this.router.navigate(['/booking'])
    
  // }
  
  // onBookClicked(ticketType: ITicketType) {
  //   this.dataSharing.sharedData = ticketType; // Store the specific ticket type
  //   this.router.navigate(['/booking']);
  // }


  goToSignup():void{
    this.router.navigate(['/signup'])
  }
  goToLogin():void{
    this.router.navigate(['/login'])
  }
  doLogout():void{
    localStorage.clear();
    location.reload();
  }





  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }


}
