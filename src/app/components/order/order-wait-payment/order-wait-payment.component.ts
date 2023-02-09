import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-wait-payment',
  templateUrl: './order-wait-payment.component.html',
  styleUrls: ['./order-wait-payment.component.css']
})
export class OrderWaitPaymentComponent implements OnInit {

  api = environment.apiUrl
  ordertList: any
  formOrder: any
  hide: boolean = true
  order: boolean = false

  constructor(private callApi: CallApiService, private router: Router, private alert: AlertService) { }

  ngOnInit(): void {
    this.getProductWatiPaymaent()
  }


  getProductWatiPaymaent() {
    this.callApi.getProductWaitPayment().subscribe(res => {
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

  setOrderListId(orderListId: string) {
    this.router.navigate(['/payment'], { queryParams: { id: orderListId } })
  }

  deleteOrderProductNotPayment(orderListId: any) {
    this.alert.warning("ต้องการลบรายการสินค้าใช่หรือไม่ ?").then(async (result) => {
      if (result.isConfirmed) {
        await this.callApi.deleteOrderProduct(orderListId, this.formOrder).subscribe(async (res) => {
          await this.alert.success("ลบรายการสินค้าเรียบร้อย")
          this.getProductWatiPaymaent()
        })
      }
    })
  }
}
