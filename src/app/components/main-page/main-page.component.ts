import { Component, inject, OnInit } from '@angular/core';
import { IEvent } from '../../model/interface/event';
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

  userInitial: string = '';
  showUserMenu: boolean = false;

  ngOnInit(): void {
    this.master.getAllEvents().subscribe((res : IEvent[])=>{
      this.allEvents = res
      this.loader = false
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


  navigateToUrl(){
    this.router.navigate(['/userEvents'])
  }


  onBookClicked(event : IEvent){
    this.dataSharing.sharedData = event;
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

  goToChangePhoneNumber(): void {
    this.router.navigate(['/change-phone-number']);
  }


}
