import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, Observable, throwError } from 'rxjs';
import { User } from './models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  baseUrl = 'http://localhost:4000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  currentUser = {};
  user = User;
  http: any;
  Users:any=[] ;
  constructor(private httpClient : HttpClient, public router: Router) { }

  register(user: User): Observable<any> {
    this.router.navigateByUrl('/users/authenticate');
    return this.httpClient.post(`${this.baseUrl}/users/addUser/`, user).pipe(
      catchError(this.errorMgmt)
    )
  }
  

  
  login(user: User) {
    
   
    return this.httpClient.post<any>(`${this.baseUrl}/users/authenticate`, user)
      .subscribe((res: any) => {
        if(!user){
         alert("Credentials are wrong");
         return null;
        }
        //localStorage.setItem('token', res.token)
        localStorage.setItem('userId', res._id)
        console.log();
        console.log(res.role);
        if(res.role === "Admin"){
          this.router.navigateByUrl('/admin');
        }
         else if(res.role === "Customer")
         {
          this.router.navigateByUrl('/users');
         }
       
        return res.user;

      },
      error=>{
        alert("Credentials are wrong");
      })
    

     
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getUserId() {
    return localStorage.getItem('userId');
  }

  get isLoggedIn(): boolean {
    let token = localStorage.getItem('userId');
    return (token !== null) ? true : false;
  }
  clearSession(): void {
    localStorage.clear();
  }


  logout() {
    if (localStorage.removeItem('UserId') == null) {
      this.router.navigate(['/users/authenticate']);
    }
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
    alert(errorMessage);
    console.log(errorMessage);
    return throwError(() => {
      
      return errorMessage;
    })
  }
}
