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

  constructor(private callApi: CallApiService, private alert: AlertService) { }

  ngOnInit(): void {
    this.getOrderSuccess()
  }

  getOrderSuccess() {
    this.callApi.getOrderSuccess().subscribe(res => {
      this.ordertList = res
      console.log(res);
    })
  }

  orderSuccess(orderListId: any) {
    this.alert.confirm("คุณได้รับสินค้าแล้วใช่หรือไม่ ?").then(async (result) => {
      if (result.isConfirmed) {
        await this.callApi.deleteOrderProduct(orderListId, this.formOrder).subscribe(async (res) => {
          await this.alert.success("ยืนยันการรับสินค้า")
          this.getOrderSuccess()
        })
      }
    })
  }



}
