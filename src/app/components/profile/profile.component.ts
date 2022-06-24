import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { profile } from 'src/app/models/profile';
import { store } from 'src/app/models/store';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formProfile: any
  profile: any = {}
  constructor(public callApi: CallApiService, public fb: FormBuilder) {
    // this.formProfile = fb.group({
    //   userId: [null],
    //   passWord: [null],
    //   userName: [null],
    //   fullName: [null],
    //   email: [null],
    //   tel: [null],
    //   address: [null],
    //   sub: [null],
    //   district: [null],
    //   province: [null],
    //   postalCode: [null]
    // })
  }

  // patchValue(receiveProfile: profile) {
  //   this.formProfile.patchValue({
  //     userId: receiveProfile.userId,
  //     passWord: receiveProfile.passWord,
  //     userName: receiveProfile.userName,
  //     fullName: receiveProfile.fullName,
  //     email: receiveProfile.email,
  //     tel: receiveProfile.tel,
  //     address: receiveProfile.address,
  //     sub: receiveProfile.sub,
  //     district: receiveProfile.district,
  //     province: receiveProfile.province,
  //     postalCode: receiveProfile.postalCode,
  //   })
  //   console.log(this.formProfile);
  // }

  // patchValueStor(receiveStore: store) {
  //   this.formProfile.patchValue({
  //     store: receiveStore.store,
  //     bankNameAccount: receiveStore.bankNameAccount,
  //     bankName: receiveStore.bankName,
  //     bankNumber: receiveStore.bankNumber
  //   })
  //   console.log(this.formProfile);   
  // }

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile() {
    this.callApi.getProfile().subscribe((res: any) => {
      this.profile = res.data.profile
      // this.patchValue(res.data.profile)
      console.log(res);
    })
  }


}
