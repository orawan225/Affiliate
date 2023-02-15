import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { store } from 'src/app/models/store';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { ProfileUserComponent } from '../profile-user/profile-user.component';

@Component({
  selector: 'app-profile-store',
  templateUrl: './profile-store.component.html',
  styleUrls: ['./profile-store.component.css']
})
export class ProfileStoreComponent implements OnInit {

  formProfile: any
  profile: any = []
  store: any = []
  file: any
  user?: string = undefined;

  constructor(private callApi: CallApiService, private cookie: CookieServiceService,
    private fb: FormBuilder, private router: Router, public dialogRef: MatDialogRef<ProfileUserComponent>, private alert: AlertService) {
    this.formProfile = fb.group({
      store: [null],
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

  patchValue(receiveProfile: store) {
    this.formProfile.patchValue({
      store: receiveProfile.store,
      bankName: receiveProfile.bankName,
      bankNameAccount: receiveProfile.bankNameAccount,
      bankNumber: receiveProfile.bankNumber,
    })
  }

  getProfile() {
    this.callApi.getProfile().subscribe((res: any) => {
      this.store = res.data.profile.store
      this.patchValue( this.store)
    })
  }

  editProfileStore() {
    this.callApi.editProfileStore(this.formProfile.value).subscribe(data => {
      //console.log(data);
      this.alert.success("แก้ไขข้อมูลสำเร็จ")
      this.closeDialog()
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
