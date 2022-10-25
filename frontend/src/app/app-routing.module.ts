import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminViewUsersComponent } from './admin-view-users/admin-view-users.component';
import { HomeComponent } from './home/home.component';
import { UsereditComponent } from './useredit/useredit.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserregistrationComponent } from './userregistration/userregistration.component';
import { AdminBusesComponent } from './admin-buses/admin-buses.component';
import { AdminEditBusComponent } from './admin-edit-bus/admin-edit-bus.component';
import { BusListComponent } from './bus-list/bus-list.component';
import { BusesComponent } from './buses/buses.component';
import { CancelpayComponent } from './cancelpay/cancelpay.component';
import { NoticketComponent } from './noticket/noticket.component';
import { PayComponent } from './pay/pay.component';
import { SuccessfullpayComponent } from './successfullpay/successfullpay.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { BuselectComponent } from './buselect/buselect.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'users/authenticate',component:UserloginComponent},
  {path:'users/addUser',component:UserregistrationComponent},
  {path:'users/getUser/:id',component:UserprofileComponent},
  {path:'users',component:UserhomeComponent},
  {path:'admin/allUsers',component:AdminViewUsersComponent},
  {path:'users/updateUser/:id',component:UsereditComponent},
  {path:'admin',component:AdminHomeComponent},
  {path:'editSeat/:id',component:BusesComponent},
  {path:'admin/addbus',component:AdminBusesComponent},
  {path:'admin/editbus/:id',component:AdminEditBusComponent},
  {path:'allbus',component:BusListComponent},
  {path:'view-ticket/:id',component:ViewTicketComponent},
  {path:'pay/:id',component:PayComponent},
  {path:'noticket',component:NoticketComponent},
  {path:'successfullpay',component:SuccessfullpayComponent},
  {path:'cancelpay',component:CancelpayComponent},
  {path:'adminprofile/:id',component:AdminprofileComponent},
  {path:'buselect',component:BuselectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
