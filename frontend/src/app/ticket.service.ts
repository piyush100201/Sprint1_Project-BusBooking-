import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Ticket } from './models/ticket';
import { ServerResponse } from './models/server-response.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  uri = 'http://localhost:4000/tickets/';

  constructor(private http:HttpClient){}

  // 
  createTicket(payload: any): Observable<ServerResponse<Ticket>> {
    return this.http.post<ServerResponse<Ticket>>(`${this.uri}/addTicket`, payload);
  }

  getTickets(){
    return this.http.get <any[]>(`${this.uri}getAllTickets`);
  }

  getTicketById(tktid: any):Observable<any>{
    return this.http.get(`${this.uri}getTicket/${tktid}`).pipe(catchError(this.errorMgmt));
  }

  //error handling
  errorMgmt(error:HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      //Get client side error
      errorMessage = error.error.message;
    }else{
      //Get server side error
      errorMessage = `Error Code : ${error.status}\n Message:${error.message}`;
    }
    console.log(errorMessage);
    return throwError(()=>{
      return errorMessage;
    })
  }

}
