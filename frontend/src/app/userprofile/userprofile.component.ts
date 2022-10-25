import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { RegistrationService } from '../registration.service';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  User!: any;
  id!: any;

  constructor(private userService:RegistrationService, private route: ActivatedRoute, private router: Router) { 
   
  }

  ngOnInit(): void {
    this.User = new User();
    
    this.userService.getUserById(this.id).subscribe((data) => {
      this.User = data;
      
      console.log(data);
    })
  }
  removeUser(user:any){
    if(window.confirm('Are you sure?')){
      this.userService.deleteUser(user._id).subscribe((data)=>{
        // this.User.splice(index,1);
        this.router.navigateByUrl('users');
      });
      //this.router.navigateByUrl('/users/home');
    }
  }
}
