import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl : string = "";
  constructor(private http:HttpClient) {
  this.apiUrl = (window as any).apiUrl;
}

}
