import { Component, inject, OnInit } from '@angular/core';
import { IEvent } from '../../model/interface/event';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {
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
      alert(event.artist)
  }
  
}
