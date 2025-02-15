import { Component, inject, OnInit } from '@angular/core';
import { IEvent, ITicketType } from '../../model/interface/event';
import { MasterService } from '../../services/master.service';
import { Router, RouterModule } from '@angular/router';
import { DataSharingService } from '../../services/data-sharing.service';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule , RouterModule , FormsModule, ReactiveFormsModule],
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
  searchTerm: string = ''
  category = '';
  sortOrder = '';
  searchControl = new FormControl('');



  ngOnInit(): void {

    this.fetchAllEvents();
    
    this.searchControl.valueChanges.pipe(
      debounceTime(300), // Wait for 300ms pause in typing
      distinctUntilChanged() // Only emit if value is different from previous
    ).subscribe(value => {
      this.searchTerm = value || '';
      this.fetchAllEvents();
    });
    
  }

  fetchAllEvents():void{
    this.master.getAllEvents(this.category , this.sortOrder , this.searchTerm).subscribe((res : IEvent[])=>{
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

  filterEvents(category: string) {
    this.category = category;
    this.fetchAllEvents();
  }

  sortEvents(sortOrder: string) {
    this.sortOrder = sortOrder;
    this.fetchAllEvents();
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







  onBookClicked(ticketType: ITicketType , event : IEvent){
   
    
    this.dataSharing.sharedEventData = event
    this.dataSharing.sharedTicketData = ticketType 
    this.router.navigate(['/booking'])

  }




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
