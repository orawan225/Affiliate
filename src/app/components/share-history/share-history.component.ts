import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-share-history',
  templateUrl: './share-history.component.html',
  styleUrls: ['./share-history.component.css']
})
export class ShareHistoryComponent implements OnInit {

  ordertList: any = []
  file: any
  api = environment.apiUrl
  baseUrl: any
  productId: any

  constructor(public callApi: CallApiService, private alert: AlertService) { }

  ngOnInit(): void {
    this.getOrderHistory()
  }

  getOrderHistory() {
    this.callApi.shareHistory().subscribe((res: any) => {
      this.ordertList = res
      console.log(this.ordertList);
    })
  }


}
