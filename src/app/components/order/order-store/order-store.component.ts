import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { orderList } from 'src/app/models/order';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-order-store',
  templateUrl: './order-store.component.html',
  styleUrls: ['./order-store.component.css']
})
export class OrderStoreComponent implements OnInit {

  formOrder: any
  ordertList: orderList[] = new Array<orderList>()
  file: any
  api = environment.apiUrl
  profile: any = []


  constructor(public callApi: CallApiService, private alert: AlertService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAllOrderByStore()
    // this.getProductByStoreId()
  }

  getAllOrderByStore() {
    this.callApi.getAllOrderByStore().subscribe((res: orderList[]) => {
      this.ordertList = res
      console.log(this.ordertList);
    })
  }

  
  // getProductByStoreId() {
  //   this.callApi.getAllOrderDetail().subscribe((res: any) => {
  //     this.ordertList = res
  //     console.log(res);
      
  //   })
  // }



  checkStatusOrderById(orderListId: any) {
    this.alert.confirm("ทำการแพ็คสินค้าเรียบร้อยหรือไม่ ?").then((result) => {
      if (result.isConfirmed) {
        this.callApi.checkStatusOrderById(orderListId, this.formOrder).subscribe(data => {
          console.log(data);
        })
        this.alert.success("รอการจัดส่งสินค้า")
      } 
      this.getAllOrderByStore()
    })
  }


}
