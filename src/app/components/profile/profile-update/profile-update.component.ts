import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { profile } from 'src/app/models/profile';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  profile: any = []
  file: any 
  formProfile: any
  user?: string = undefined;

  constructor(private callApi: CallApiService, private cookie: CookieServiceService,
    private fb: FormBuilder, private router: Router) {
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

    this.user = cookie.getUserId();  
    console.log(this.user);
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
    this.callApi.getProfile().subscribe((res: any) => {
      this.profile = res.data.profile
      this.patchValue(res.data.profile)
    })
  }

  editProfile() {
    const data = new FormData()
    if (this.file) {
      data.append('file', this.file, this.file.name)
    }
    data.append('profile', JSON.stringify(this.formProfile.value))
    this.callApi.editProfile(data).subscribe(data => {
      console.log(data);
    })
    this.getProfile()
  }


}
