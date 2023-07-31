import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  LoggedIn : boolean;
  registeredID : string = "UserName";
  menu:any=[
    {
      icon : "fas fa-cogs",
      routerLinkUrl : "/dashboard",
      moduleName : "Dashboard" 
    },
    {
      icon : "fas fa-cogs",
      routerLinkUrl : "/dashboardcomponents",
      moduleName : "Dashboard Components" 
    },
  ]
  constructor(private auth:AuthService
  ) { }

  ngOnInit() {

  }

  logOut(){
    this.auth.logOut();
  }
}
