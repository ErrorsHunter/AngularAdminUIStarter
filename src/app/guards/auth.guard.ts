import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
    private router : Router,
    private toast: HotToastService){

  }
  canActivate():boolean{
    if(this.auth.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['login'])
      this.toast.error("You must Login First");
      return false;
    }
  }
  
}
