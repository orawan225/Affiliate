import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orderlist-user',
  templateUrl: './orderlist-user.component.html',
  styleUrls: ['./orderlist-user.component.css']
})
export class OrderlistUserComponent implements OnInit {

  ordertList: any
  formOrder: any
  api = environment.apiUrl

  constructor(private callApi: CallApiService, private alert: AlertService) { }

  ngOnInit(): void {
    this.getAllOderUser()
  }

  getAllOderUser() {
    this.callApi.getAllOderUser().subscribe(res => {
      this.ordertList = res
      //console.log(res);
    })
  }

  orderSuccess(orderListId: any) {
    this.alert.confirm("กดสินค้าใช่หรือไม่ ?").then(async (result) => {
      if (result.isConfirmed) {
        await this.callApi.orderdeliverySuccess(orderListId, this.formOrder).subscribe(async (res) => {
          await this.alert.success("ยืนยันการรับสินค้า")
          window.location.reload();
          this.getAllOderUser()
        })
      }
    })
  }

}
