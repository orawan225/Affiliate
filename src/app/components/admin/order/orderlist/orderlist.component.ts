import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(public callApi: CallApiService, private alert: AlertService, private fb: FormBuilder) { }


  formOrder: any
  order: any = []
  api = environment.apiUrl

  ngOnInit(): void {
    this.getAllOrderStore()
  }

  getAllOrderStore() {
    this.callApi.getOrderStore().subscribe((data: any) => {
      this.order = data
      console.log(data)
    })
  }

  updateOrderPayment(orderListId: any) {
    this.alert.confirm("ทำการยืนยันคำสั่งซื้อใช่หรือไม่ ?").then(async (result) => {
      if (result.isConfirmed) {
        this.callApi.updateOrderPayment(orderListId, this.formOrder).subscribe(data => {
          this.alert.success("รอการจัดส่งสินค้า")
          window.location.reload();
          this.getAllOrderStore()

        })
      }

    })
  }


}

