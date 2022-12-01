import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { orderList } from 'src/app/models/order';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-money-history',
  templateUrl: './money-history.component.html',
  styleUrls: ['./money-history.component.css']
})
export class MoneyHistoryComponent implements OnInit {

  formOrder: any
  ordertList: any = []
  file: any
  api = environment.apiUrl
  profile: any = []
  store: any = []
  totalPrice = 0


  constructor(public callApi: CallApiService, private alert: AlertService, private fb: FormBuilder, private cookie: CookieServiceService) {
    this.formOrder = fb.group({
      orderListId: [null],
      price: [null],
      time: [null],
      date: [null],
      status: [null]
    })

    this.store = cookie.getUserId();  
    console.log(this.store)
  }

  patchValue(receiveOrder: orderList) {
    this.formOrder.patchValue({
      orderListId: receiveOrder.orderListId,
      status: receiveOrder.status
    })
  }

  ngOnInit(): void {
    this.getAllOrderByStore()
     this.getmoneyStore()
  }

  getAllOrderByStore() {
    this.callApi.getAllOrderByStore().subscribe((res: any) => {
      this.ordertList = res
    })
  }


  checkStatusOrderById(orderListId: string) {
    console.log(orderListId);
    this.alert.confirm("ทำการแพ็คสินค้าเรียบร้อยหรือไม่ ?").then((result) => {
      if (result.isConfirmed) {
        this.callApi.checkStatusOrderById(orderListId, this.formOrder.value).subscribe(data => {
          console.log(data);
        })
        this.alert.success("รอการจัดส่งสินค้า")
      }
    })
  }

  getmoneyStore() {
    this.callApi.getTotalMoney().subscribe((res: any) => {
      this.totalPrice = res.data.total_price

    })
  }


  wathdrawMoney() {
    this.alert.warning("ต้องการถอนเงินใช่หรือไม่ ?").then((result) => {
      if (result.isConfirmed) {
        this.callApi.wathdrawMoney(this.store).subscribe(data => {
          console.log(data);
        })
        this.alert.success("ทำการถอนเงินสำเร็จ")
      } 
    })
  }

}
