import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
  hide: boolean = true

  constructor(public callApi: CallApiService, private alert: AlertService, private router: Router) { }

  ngOnInit(): void {
    this.getOrderHistory()
  }

  getOrderHistory() {
    this.callApi.getOrderHistory().subscribe(res => {
      this.ordertList = res
      this.hide = false
      // console.log(res);
    })
  }

  routerLink() {
    this.router.navigate(['/product-detail'])
  }

}
