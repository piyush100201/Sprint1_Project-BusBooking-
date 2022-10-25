import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { Header2Component } from './header2/header2.component';
import { Header3Component } from './header3/header3.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserregistrationComponent } from './userregistration/userregistration.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { UsereditComponent } from './useredit/useredit.component';
import { AdminViewUsersComponent } from './admin-view-users/admin-view-users.component';
import { FilterUsersPipe } from './filter-users.pipe';
import { UserloginComponent } from './userlogin/userlogin.component';
import { RegistrationService } from './registration.service';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminBusesComponent } from './admin-buses/admin-buses.component';
import { AdminEditBusComponent } from './admin-edit-bus/admin-edit-bus.component';
import { BusListComponent } from './bus-list/bus-list.component';
import { BusesComponent } from './buses/buses.component';
import { BusService } from './service/bus.service';
import { CancelpayComponent } from './cancelpay/cancelpay.component';
import { NoticketComponent } from './noticket/noticket.component';
import { PayComponent } from './pay/pay.component';
import { SuccessfullpayComponent } from './successfullpay/successfullpay.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { TicketService } from './ticket.service';
import { SeatNamePipe } from './pipes/seatname.pipe';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { BuselectComponent } from './buselect/buselect.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Header2Component,
    Header3Component,
    FooterComponent,
    HomeComponent,
    UserregistrationComponent,
    UserprofileComponent,
    UserhomeComponent,
    UsereditComponent,
    AdminViewUsersComponent,
    FilterUsersPipe,
    UserloginComponent,
    AdminHomeComponent,
    AdminBusesComponent,
    AdminEditBusComponent,
    BusListComponent,
    BusesComponent,
    CancelpayComponent,
    NoticketComponent,
    PayComponent,
    SuccessfullpayComponent,
    ViewTicketComponent,
    SeatNamePipe,
    AdminprofileComponent,
    BuselectComponent
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,

  ],
  providers: [RegistrationService,BusService,TicketService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
