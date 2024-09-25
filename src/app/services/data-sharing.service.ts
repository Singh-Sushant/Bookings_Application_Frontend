import { Injectable } from '@angular/core';
import { IEvent } from '../model/interface/event';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  sharedData !: IEvent

}
