import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ServerResponse } from '../models/server-response.model';
import { Bus } from '../models/bus.model';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';


const domain = 'http://localhost:4000';
const getSingleBusEndpoint = domain + '/buses/getBusById/';
const createBusEndpoint = domain + '/buses/addBus';
const updateBusEndpoint = domain + '/buses/selectseats/';
// const updateBusAllEndpoint = domain + '/buses/selectseats/';
const getAllBusEndpoint = domain + '/buses/getAllBus/';
const editAllBusEndpoint = domain + '/buses/editBusAll/';


@Injectable({
  providedIn: 'root'
})
export class BusService {


  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

// Creating the bus by using all model values
  createBus(payload: Bus): Observable<ServerResponse<Bus>> {
    console.log(payload)
    return this.http.post<ServerResponse<Bus>>(createBusEndpoint, payload)
    .pipe(catchError(this.errorMgmt));
  }

  // Getting single bus by Id
  getSingleBus(id: string): Observable<Bus> {
    return this.http.get<Bus>(getSingleBusEndpoint + id)
    .pipe(catchError(this.errorMgmt));
  }

  
  // Getting All bus by 
  getAllBus(): Observable<any> {
    return this.http.get<any>(getAllBusEndpoint)
    .pipe(catchError(this.errorMgmt));
  }

// Upating seat bus by id and inputing the all model and changinf 
  updateSingleBus(id: string, payload: Bus): Observable<ServerResponse<Bus>> {
    console.log(payload);

    return this.http.put<ServerResponse<Bus>>(updateBusEndpoint + id, payload);
  }


  // / Upating single bus by id and inputing the all model and changinf 
  updateSingleBusAll(id: string, payload: Bus): Observable<ServerResponse<Bus>> {
   console.log( getAllBusEndpoint + id);
   
    return this.http.put<ServerResponse<Bus>>( editAllBusEndpoint + id, payload);
  }

  //error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //Get client side error
      errorMessage = error.error.message;
    } else {
      //Get server side error
      errorMessage = `Error Code : ${error.status}\n Message:${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    })
  }


}
