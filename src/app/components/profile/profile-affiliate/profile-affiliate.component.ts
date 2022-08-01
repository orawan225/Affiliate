import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { affiliate } from 'src/app/models/affiliate';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

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
    private fb: FormBuilder, private router: Router) {
    this.formProfile = fb.group({
      bankName: [null],
      bankNameAccount: [null],
      bankNumber: [null],
    })

    this.user = cookie.getUserId();  
    console.log(this.user);
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
      this.profile = res.data.store
      this.affiliate = res.data.profile.store
      this.patchValue(res.data.profile.store)
    })
  }

  editProfileAffiliate() {
    // const data = new FormData()
    // if (this.file) {
    //   data.append('file', this.file, this.file.name)
    // }
    // data.append('profile', JSON.stringify(this.formProfile.value))
    this.callApi.editProfileAffiliate(this.formProfile.value).subscribe(data => {
      console.log(data);
    })
  }

}
