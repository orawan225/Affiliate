import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { profile } from 'src/app/models/profile';
import { CallApiService } from 'src/app/services/call-api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  formAddress: any
  profile: any = []
  productList: any = []

  constructor(private fb: FormBuilder, public cartService: CartService, private callApi: CallApiService) {
    this.formAddress = fb.group({
      userId: [null],
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
      userId: receiveProfile.userId,
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
    this.getProfile()
    this.getProductAll()
  }


  getProfile() {
    this.callApi.getProfile().subscribe((res: any) => {
      this.profile = res.data.profile
      this.patchValue(res)
      console.log(this.formAddress);
      console.log(res);
    })
  }

  editAddress() {
  }

  getProductAll() {
    this.productList = this.cartService.getCart()
    console.log(this.productList); 
  }

}
