import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { profile } from 'src/app/models/profile';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  usrId: any
  user: any = []
  formProfile: any
  file: any
  img: any = 'data:image/png;base64,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'
  api = environment.apiUrl
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
      this.usrId = res.id
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
    const _auth: boolean = this.cookie.getToken() ? true : false;
    if (_auth) {
      this.callApi.getUserById(this.usrId).subscribe((res: any) => {
        this.user = res.user
        this.fullName = res.user.fullName
        this.img = this.api + res.image
        this.patchValue(res.user)
        console.log(this.user);

      })
    }
  }

  editProfileUser() {
    const data = new FormData()
    data.append('user', JSON.stringify(this.formProfile.value))
    this.callApi.editProfileUser(this.usrId,data).subscribe(data => {
      console.log(data);
      this.alert.success("แก้ไขข้อมูลสำเร็จ")
      this.router.navigate(['/user'])
    })
  }
}