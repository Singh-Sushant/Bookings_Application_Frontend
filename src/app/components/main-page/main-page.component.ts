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

  loader : boolean = true;
  allEvents : IEvent[] = []

  ngOnInit(): void {
    this.master.getAllEvents().subscribe((res : IEvent[])=>{
      this.allEvents = res
      this.loader = false
    },error=>{
      alert("problem with apI")
      this.loader = false;
    });
    
  }


  onBookClicked(event : IEvent){
    this.dataSharing.sharedData = event;
    this.router.navigate(['/booking'])
    
  }
  
}
