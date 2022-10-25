import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';


@Component({
  selector: 'app-admin-view-users',
  templateUrl: './admin-view-users.component.html',
  styleUrls: ['./admin-view-users.component.css']
})
export class AdminViewUsersComponent implements OnInit {

  User:any = [];
  searchText:any;
  UserbyId:any;
  constructor(private regService:RegistrationService) { 
    this.readUser();
  }

  ngOnInit(): void {
  }
  readUser(){
    this.regService.getUsers().subscribe((data)=>{
      this.User = data;
    })
  }

  removeUser(user:any, index:any){
    if(window.confirm('Are you sure?')){
      this.regService.deleteUser(user._id).subscribe((data)=>{
        this.User.splice(index,1);
      })
    }
  }

}
