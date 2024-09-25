import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookingData, IBookingResponse, IEvent } from '../model/interface/event';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http : HttpClient) { }

  getAllEvents():Observable<IEvent[]>{
    return this.http.get<IEvent[]>("http://localhost:5073/api/Events")
  }

  bookEvent(bookingData : any):Observable<IBookingResponse>{
    console.log(bookingData)
    return this.http.post<any>("http://localhost:5073/api/Bookings",bookingData)
  }

}
