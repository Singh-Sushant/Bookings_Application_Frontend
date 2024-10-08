import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IBookingData, IBookingResponse, IEvent } from '../model/interface/event';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http : HttpClient) { }

  getAllEvents():Observable<IEvent[]>{
    return this.http.get<IEvent[]>("http://localhost:5073/api/Events")
  }

  // bookEvent(eventData : any):Observable<any>{
  //   // console.log(bookingData)
  //   const token = localStorage.getItem('jwtToken');
  // if (!token) {
  //   throw new Error('User not authenticated');
  // }

  // const headers = new HttpHeaders()
  //     .set('Authorization', `Bearer ${token}`)
  //     .set('Content-Type', 'application/json');



  // console.log("\n");
  // console.log(headers);
  // console.log("\n");
  
  // return this.http.post(`http://localhost:5073/api/Bookings`, eventData, { headers });
  // }


  bookEvent(eventData: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return throwError(() => new Error('User not authenticated'));
    }

    console.log(token);
    
    const data={
      "username": "aryan",
      "email": "aryan@example.com",
      "phoneNumber": "9090909090",
      "numberOfTickets": 2,
      "totalPrice": 300,
      "eventId": "e4b1d89f-8272-4a2b-b8b8-2276f497912b"
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)


    return this.http.post(`http://localhost:5073/api/Bookings`, data, { headers })
      .pipe(
        tap(response => console.log('Response:', response)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }









  getEventsForUser(email : string){
    const token = localStorage.getItem('jwtToken');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
  return this.http.get(`http://localhost:5073/api/Bookings/${email}`, { headers });
  }
  registerUser(data: any): Observable<any> {
    return this.http.post(`http://localhost:5073/api/Account/Register`, data);
  }

  loginUser(data: any): Observable<any> {
    return this.http.post(`http://localhost:5073/api/Account/Login`, data);
  }

}
