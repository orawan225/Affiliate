import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { profile } from 'src/app/models/profile';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userId: any
  user: any = []
  formProfile: any
  file: any
  fullName: any


  constructor(private callApi: CallApiService, private cookie: CookieServiceService, private router: Router,
    private acrout: ActivatedRoute, private fb: FormBuilder, private alert: AlertService, private dialog: MatDialog) {

    this.formProfile = fb.group({
      userName: [null],
      passWord: [null],
      fullName: [null],
      email: [null],
      tel: [null],
      address: [null],
      sub: [null],
      district: [null],
      province: [null],
      postalCode: [null]
    })

    acrout.queryParams.subscribe((res: any) => {
      this.userId = res.id
    })
  }

  patchValue(receiveProfile: profile) {
    this.formProfile.patchValue({
      userName: receiveProfile.userName,
      passWord: receiveProfile.passWord,
      fullName: receiveProfile.fullName,
      email: receiveProfile.email,
      tel: receiveProfile.tel,
      address: receiveProfile.address,
      sub: receiveProfile.sub,
      district: receiveProfile.district,
      province: receiveProfile.province,
      postalCode: receiveProfile.postalCode,
    })
  }

  ngOnInit(): void {
    this.getUserId()
  }

  getUserId() {
    this.callApi.getUserById(this.userId).subscribe((res: any) => {
      this.user = res.user
      this.patchValue(res.user)
      //console.log(this.user);
    })
  }

  editProfileUser() {
    // const data = new FormData()
    // data.append('user', JSON.stringify(this.formProfile.value))
    let data = new profile()
    data.userName = this.formProfile.value.userName
    data.passWord = this.formProfile.value.passWord
    this.callApi.editProfileUser(this.userId, data).subscribe(res => {
      //console.log(data);
      this.alert.success("แก้ไขข้อมูลสำเร็จ")
      setTimeout(() => {
        this.router.navigate(['/user'])
      }, 1000);
    })
  }
}
