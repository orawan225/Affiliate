import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { affiliate } from 'src/app/models/affiliate';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { ProfileUserComponent } from '../profile-user/profile-user.component';

@Component({
  selector: 'app-profile-affiliate',
  templateUrl: './profile-affiliate.component.html',
  styleUrls: ['./profile-affiliate.component.css']
})
export class ProfileAffiliateComponent implements OnInit {

  formProfile: any
  profile: any = []
  affiliate: any = []
  file: any
  user?: string = undefined;

  constructor(private callApi: CallApiService, private cookie: CookieServiceService,
    private fb: FormBuilder, private router: Router, public dialogRef: MatDialogRef<ProfileUserComponent>, private alert: AlertService) {
    this.formProfile = fb.group({
      bankName: [null],
      bankNameAccount: [null],
      bankNumber: [null],
    })

    this.user = cookie.getUserId();
    //console.log(this.user);
  }

  ngOnInit(): void {
    this.getProfile()
  }

  patchValue(receiveProfile: affiliate) {
    this.formProfile.patchValue({
      bankName: receiveProfile.bankName,
      bankNameAccount: receiveProfile.bankNameAccount,
      bankNumber: receiveProfile.bankNumber,
    })
  }

  getProfile() {
    this.callApi.getProfile().subscribe((res: any) => {
      this.affiliate = res.data.profile.affiliate
      this.patchValue(this.affiliate)
    })
  }

  editProfileAffiliate() {
    this.callApi.editProfileAffiliate(this.formProfile.value).subscribe(data => {
      //console.log(data);
      this.alert.success("แก้ไขข้อมูลสำเร็จ")
      this.closeDialog()
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
