import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-wait-delivery',
  templateUrl: './order-wait-delivery.component.html',
  styleUrls: ['./order-wait-delivery.component.css']
})
export class OrderWaitDeliveryComponent implements OnInit {

  ordertList: any
  profile: any
  api = environment.apiUrl
  hide: boolean = true
  order: boolean = false

  constructor(private callApi: CallApiService) { }

  ngOnInit(): void {
    this.getWaitDelivery()
    this.getProfileAdmin()
  }

  getWaitDelivery() {
    this.callApi.getWaitDeliveryOrder().subscribe(res => {
      this.ordertList = res
      console.log(res);
      if (this.ordertList == 0) {
        this.hide = false
        this.order = false
      }
      else {
        this.order = true
      }
    })
  }

  getProfileAdmin() {
    this.callApi.getProfilesAdmin().subscribe((res: any) => {
      this.profile = res
      console.log(res);
    })
  }

}
