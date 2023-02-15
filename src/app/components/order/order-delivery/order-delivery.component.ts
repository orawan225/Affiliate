import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-delivery',
  templateUrl: './order-delivery.component.html',
  styleUrls: ['./order-delivery.component.css']
})
export class OrderDeliveryComponent implements OnInit {
  
  api = environment.apiUrl
  ordertList: any

  constructor(public callApi: CallApiService) { }

  ngOnInit(): void {
    this.getOrderDelivery()
  }

  getOrderDelivery(){
    this.callApi.getStatusSuccess().subscribe(res => {
      this.ordertList = res
      //console.log(res);
      
    })
  }

}
