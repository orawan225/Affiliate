import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orderlist-payment',
  templateUrl: './orderlist-payment.component.html',
  styleUrls: ['./orderlist-payment.component.css']
})
export class OrderlistPaymentComponent implements OnInit {

  
  api = environment.apiUrl
  ordertList: any

  constructor(public callApi: CallApiService) { }

  ngOnInit(): void {
    this.getAllOrderDeliveryByUser()
  }

  getAllOrderDeliveryByUser(){
    this.callApi.getAllOrderDelivery().subscribe(res => {
      this.ordertList = res
      //console.log(res);
      
    })
  }
}
