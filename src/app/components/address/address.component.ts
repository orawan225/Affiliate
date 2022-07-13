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
  file: any

  constructor(private fb: FormBuilder, public cartService: CartService, private callApi: CallApiService) {
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
    this.getProfile()
  }


  getProfile() {
    this.callApi.getProfile().subscribe((res: any) => {
      this.profile = res.data.profile
      this.patchValue(res.data.profile)
      console.log(res);
      
    })
  }

  editAddress() {
    const data = new FormData()
    if(this.file) {
      data.append('file', this.file, this.file.name)
    }
    data.append('product', JSON.stringify(data))
    this.callApi.editProfile().subscribe((res => {
      console.log(res);
    }))
  }

}
