import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { profile } from 'src/app/models/profile';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {

  formProfile: any
  profile: any
  file: any
  fullName: any
  email: any
  tel: any
  address: any
  sub: any
  district: any
  province: any
  postalCode: any

  constructor(private callApi: CallApiService, private cookie: CookieServiceService,
    private fb: FormBuilder, private router: Router, public dialogRef: MatDialogRef<ProfileAdminComponent>,
     private alert: AlertService) {
    this.formProfile = fb.group({
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
    this.formProfile.patchValue({
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
    const _auth: boolean = this.cookie.getToken() ? true : false;
    if (_auth) {
      this.callApi.getProfileAdmin().subscribe((res: any) => {
        this.profile = res
        this.fullName = res.fullName
        this.email = res.email
        this.tel = res.tel
        this.address = res.address
        this.sub = res.sub
        this.district = res.district
        this.province = res.province
        this.postalCode = res.postalCode
        this.patchValue(this.profile)
        //console.log(res);
        this.patchValue(res.data.profile)
      })
    }
    
  }

  editProfile() {
    const data = new FormData()
    if (this.file) {
      data.append('file', this.file, this.file.name)
    }
    data.append('profile', JSON.stringify(this.formProfile.value))
    this.callApi.editProfile(data).subscribe(data => {
      //console.log(data);
      this.alert.success("แก้ไขข้อมูลสำเร็จ")
      this.closeDialog()
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
