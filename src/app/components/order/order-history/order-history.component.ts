import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { orderList } from 'src/app/models/order';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  ordertList: any = []
  file: any
  api = environment.apiUrl


  constructor(public callApi: CallApiService, private alert: AlertService) { }

  ngOnInit(): void {
    this.getOrderHistory()
  }

  getOrderHistory() {
    this.callApi.getOrderHistory().subscribe(res => {
      this.ordertList = res
      console.log(res);
    })
  }

}
