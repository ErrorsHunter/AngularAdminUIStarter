import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboardcomponents',
  templateUrl: './dashboardcomponents.component.html',
  styleUrls: ['./dashboardcomponents.component.css']
})
export class DashboardcomponentsComponent implements OnInit {

  pageNo:number = 1;
  searchKeyword:string="";
  requestList:any=[]
  constructor() { }

  ngOnInit() {
  }

}
