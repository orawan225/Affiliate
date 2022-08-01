import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { order } from 'src/app/models/order';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  formOrder: any
  ordertList: any = []
  file: any
  api = environment.apiUrl
  profile: any = []


  constructor(public callApi: CallApiService, private alert: AlertService, private fb: FormBuilder) {
    this.formOrder = fb.group({
      orderListId: [null],
      price: [null],
      time: [null],
      date: [null],
      status: [null]
    })
  }

  patchValue(receiveOrder: order) {
    this.formOrder.patchValue({
      orderListId: receiveOrder.orderListId,
      price: receiveOrder.price,
      time: receiveOrder.time,
      date: receiveOrder.date,
      status: receiveOrder.status,
    })
  }



  ngOnInit(): void {
    this.getAllOrderByStore()
    this.getProfile()
  }

  getAllOrderByStore() {
    this.callApi.getAllOrderByStore().subscribe((res: any) => {
      this.ordertList = res
      console.log(res);
      console.log(this.ordertList);
      
    })
  }

  getProfile() {
    this.callApi.getProfile().subscribe((res: any) => {
      this.profile = res.data.profile
      console.log(this.profile);
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


}
