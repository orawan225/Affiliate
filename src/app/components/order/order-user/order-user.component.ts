import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-user',
  templateUrl: './order-user.component.html',
  styleUrls: ['./order-user.component.css']
})
export class OrderUserComponent implements OnInit {

  ordertList: any
  api = environment.apiUrl

  constructor(private callApi: CallApiService, private router: Router, private alert: AlertService) { }

  ngOnInit(): void {
    this.  getOrder()
  }

  getOrder() {
    this.callApi.getOrderByUser().subscribe(res => {
      this.ordertList = res
      //console.log(this.ordertList);
    })
  }

}
