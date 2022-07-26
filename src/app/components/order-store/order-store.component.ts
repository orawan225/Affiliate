import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { profile } from 'src/app/models/profile';
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
  ordertList: any = []
  file: any
  api = environment.apiUrl
  profile: any
  formAddress: any

  constructor(public callApi: CallApiService, private alert: AlertService, private fb: FormBuilder) {
    this.formAddress = fb.group({
      fullName: [null],
      email: [null],
      tel: [null],
      address: [null],
      sub: [null],
      district: [null],
      province: [null],
      postalCode: [null]
    })
  }

  patchValue(receiveProfile: profile) {
    this.formAddress.patchValue({
      fullName: receiveProfile.fullName,
      email: receiveProfile.email,
      tel: receiveProfile.tel,
      address: receiveProfile.address,
      sub: receiveProfile.sub,
      district: receiveProfile.district,
      province: receiveProfile.province,
      postalCode: receiveProfile.postalCode
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
    })
  }

  getProfile() {
    this.callApi.getProfile().subscribe((res: any) => {
      this.profile = res.data.profile
      this.patchValue(res.data.profile)
      console.log(this.profile);
      
    })
  }

  submitOrderId(ordertId: string) {
    this.alert.confirm("ทำการแพ็คสินค้าเรียบร้อยหรือไม่ ?").then((result) => {
      if (result.isConfirmed) {
        // this.callApi.submitOrderId(ordertId, this.formPayment.value).subscribe(data => {
        //   console.log(data);
        // })
        this.alert.success("รอการจัดส่งสินค้า")
      }
    })
  }


}
