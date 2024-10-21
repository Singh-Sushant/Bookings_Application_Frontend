import { Injectable } from '@angular/core';
import { IEvent, ITicketType } from '../model/interface/event';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  sharedEventData !: IEvent 
  sharedTicketData !: ITicketType 

}
