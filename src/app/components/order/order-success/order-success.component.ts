import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  ordertList: any
  formOrder: any
  hide: boolean = true
  order: boolean = false

  constructor(private callApi: CallApiService, private alert: AlertService) { }

  ngOnInit(): void {
    this.getOrderSuccess()
  }

  getOrderSuccess() {
    this.callApi.getOrderSuccess().subscribe(res => {
      this.ordertList = res
      //console.log(res);
      if (this.ordertList == 0) {
        this.hide = false
        this.order = false
      }
      else {
        this.order = true
      }
    })
  }

  orderSuccess(orderListId: any) {
    this.alert.confirm("คุณได้รับสินค้าแล้วใช่หรือไม่ ?").then(async (result) => {
      if (result.isConfirmed) {
        await this.callApi.deliverySuccess(orderListId, this.formOrder).subscribe(async (res) => {
          await this.alert.success("ยืนยันการรับสินค้า")
          this.getOrderSuccess()
        })
      }
    })
  }



}
