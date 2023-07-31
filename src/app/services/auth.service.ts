import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';


export interface ConsumerClaims {
  contractaccountnumber: string,
  meterinstalledid: string,
  installationnumber: string,
  address: string,
  consumername: string
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  apiUrl: string = "";

  isLogggedInSubject = new BehaviorSubject<boolean>(false);
  ConsumerClaimsSubject = new BehaviorSubject<ConsumerClaims[] | null>(null);
  jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.apiUrl = (window as any).apiUrl;
  }

  decodedToken() {
    const token = this.getToken();
    if (token != null) {
      return this.jwtHelper.decodeToken(token)
    }
    return null;
  }

  login(loginObj: any) {
    return this.http.post(`${this.apiUrl}LoginRegister/Login`, loginObj);
  }

  register(postObj: any) {
    return this.http.post(`${this.apiUrl}LoginRegister/Register`, postObj);
  }

  logOut() {
    sessionStorage.clear();
    this.isLogggedInSubject.next(false);
    this.router.navigate([""]);
  }

  storeToken(tokenValue: string) {
    sessionStorage.setItem('accessToken', tokenValue);
  }

  getToken() {
    return sessionStorage.getItem('accessToken');
  }

  isLoggedIn(): boolean {
    let isLoggedIn = !!this.getToken();
    this.isLogggedInSubject.next(isLoggedIn);
    return isLoggedIn;
  }

}
