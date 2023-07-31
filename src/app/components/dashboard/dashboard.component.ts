import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pageNo: number = 1;
  noticeList: any = [];
  constructor(private spinner: NgxSpinnerService) {}
    

  AddData() {
    this.noticeList.push({
      title: "Title " + 1,
      description: "Lorem ipsum dolor sit amet  quibusdam nemo voluptatibus eveniet quasi, Omnis eius libero dolorum? Ullam. Lorem ipsum dolor sit amet  quibusdam nemo voluptatibus eveniet quasi, Omnis eius libero dolorum? Ullam.",
      createdon: new Date()
    });
  }

  ngOnInit() {
    this.AddData();
  }


}
