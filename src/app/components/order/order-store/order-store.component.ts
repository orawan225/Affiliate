import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { orderList } from 'src/app/models/order';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-order-store',
  templateUrl: './order-store.component.html',
  styleUrls: ['./order-store.component.css']
})
export class OrderStoreComponent implements OnInit {

  ordersList: orderList[] = new Array<orderList>()
  file: any
  api = environment.apiUrl
  formTrackNumber: any
  submitAdd: boolean = false;

  constructor(public callApi: CallApiService, private alert: AlertService, private fb: FormBuilder) {
    this.formTrackNumber = fb.group({
      trackingNumber: [null, Validators.required, Validators.pattern('^[0-9]*$')]
    })
  }

  ngOnInit(): void {
    this.getAllOrderByStore()
  }

  get formValidAdd() {
    return this.formTrackNumber.controls;
  }


  getAllOrderByStore() {
    this.callApi.getAllOrderByStore().subscribe((res: orderList[]) => {
      this.ordersList = res
      console.log(this.ordersList);
    })
  }

  trackingNumber(orderListId: any) {
    this.submitAdd = true;
    if (this.formTrackNumber.validl) {
      this.callApi.trackingNumber(orderListId, this.formTrackNumber.value).subscribe(res => {
        this.alert.success("ทำการส่งสินค้าเรียบร้อย")
        this.getAllOrderByStore()
      })
    }
  }
}
