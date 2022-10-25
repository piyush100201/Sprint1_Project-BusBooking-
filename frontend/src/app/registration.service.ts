import { HttpClient,HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { User } from './models/user';
import { catchError,map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  uri = 'http://localhost:4000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  users: User[] = [];
  currentUserId!: any;
  id!: number;

  constructor(private httpClient:HttpClient, private router:Router, private authService:AuthServiceService) { }

  ngOnInit(): void {
    this.currentUserId = this.getUserById(this.id);
  }
  clearSession(): void {
    localStorage.clear();
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getAuthHeader(): HttpHeaders {
    const headers = new HttpHeaders(
      {
        Authorization: ''+this.authService.getToken()
      }
    );
    return headers;
  }

  isLoggedIn(): boolean {
    try {
      if (localStorage.getItem('userId')) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  //to get list of users
  getUsers()
  {
    return this.httpClient.get(`${this.uri}/users/getAllUsers`);
  }

  //to get user details for single user using id
  getUserById(id:any) {
    const userId = localStorage.getItem('userId')
    
    return this.httpClient.get(`${this.uri}/users/getUser/${userId}`, {headers: this.getAuthHeader()})
      .pipe(map((res:any)=>{
        return res || {};
      }),
      catchError(this.errorMgmt));
      

  }

  //to create/add new user
  addUser(user:User):Observable<any>
  {
    let url=`${this.uri}/users/addUser`;
    return this.httpClient.post(url,user).pipe(catchError(this.errorMgmt));
  }

  //update user
  updateUser(id:any, data:any): Observable<any>
  {
    const userId = localStorage.getItem('userId')
    let url = `${this.uri}/users/updateUser/${userId}`
    return this.httpClient.put(url, data, {headers: this.getAuthHeader()})

  }

  //delete user
  deleteUser(id : any) :Observable<any>{
    let url=`${this.uri}/users/deleteUser/${id}`;
    return this.httpClient
    .delete(url, {headers:this.headers})
    .pipe(catchError(this.errorMgmt));
  }

  
  //error handling
  errorMgmt(error:HttpErrorResponse)
  {
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
