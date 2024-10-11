import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IBookingData, IBookingResponse, IEvent } from '../model/interface/event';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http : HttpClient) { }

  getAllEvents():Observable<IEvent[]>{
    return this.http.get<IEvent[]>("http://localhost:5073/api/Events")
  }


  bookEvent(eventData: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return throwError(() => new Error('User not authenticated'));
    }

    console.log(token);
    
   
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)


    return this.http.post(`http://localhost:5073/api/Bookings`, eventData, { headers })
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





  getEventsForUser(email : string | null){
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

  cancelBooking(id:string) : Observable<any>{
    console.log("Guid" , id);
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.delete(`http://localhost:5073/api/Bookings/${id}` , {headers : headers})
  }

  updatePhone(data : any) : Observable<any>{
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:5073/api/Account/updatePhone?PhoneNumber=${data.PhoneNumber}&Email=${data.Email}`, data, { headers: headers , responseType : 'text'})
      
  }

  updatePassword(updateData : any):Observable<any>{
    console.log(updateData);
    

    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
      return this.http.put(`http://localhost:5073/api/Account/updatePassword`, updateData , {headers : headers , responseType  :'text' });
  }

}
