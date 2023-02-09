import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-dlv-history',
  templateUrl: './order-dlv-history.component.html',
  styleUrls: ['./order-dlv-history.component.css']
})
export class OrderDlvHistoryComponent implements OnInit {

  ordertList: any = []
  file: any
  api = environment.apiUrl
  hide: boolean = true
  order: boolean = false


  constructor(public callApi: CallApiService, private alert: AlertService) { }

  ngOnInit(): void {
    this.getOrderHistory()
  }

  getOrderHistory() {
    this.callApi.getOrderHistoryDelivery().subscribe(res => {
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

}
