import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-order-wait-delivery',
  templateUrl: './order-wait-delivery.component.html',
  styleUrls: ['./order-wait-delivery.component.css']
})
export class OrderWaitDeliveryComponent implements OnInit {

  ordertList: any

  constructor(private callApi: CallApiService) { }

  ngOnInit(): void {
    this.getWaitDelivery()
  }

  getWaitDelivery() {
    this.callApi.getWaitDeliveryOrder().subscribe(res => {
      this.ordertList = res
      console.log(res);
      
    })
  }

}
