import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { profile } from 'src/app/models/profile';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
// import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formProfile: any
  file: any
  profile: any = []
  store: any = []
  affiliate: any = []
  role?: string 
  showCardRole: any
  img: any = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'

  constructor(private callApi: CallApiService, private cookie: CookieServiceService, 
    private ref: ChangeDetectorRef,private fb: FormBuilder) {
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
      postalCode: receiveProfile.postalCode,
    })
  }

  ngOnInit(): void {
    this.getProfile()
    this.getRoleProfile()
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(profile);
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  getProfile() {
    this.callApi.getProfile().subscribe((res: any) => {
      this.profile = res.data.profile
      this.store = res.data.profile.store
      this.affiliate = res.data.profile.affiliate
      console.log(this.profile);
    })   
  }

  editProfile(profile: string) {
    delete this.formProfile.value.productId
    const data = new FormData()
    if(this.file) {
      data.append('file', this.file, this.file.name)
    }
    data.append('product', JSON.stringify(this.formProfile.value))
    this.callApi.editProfile(profile, data).subscribe((res: any) => {
      console.log(res);
      
    })
  }

  getRoleProfile(){
    if(this.cookie.getRoleAccount()){
      this.showCardRole = this.cookie.getRoleAccount()
    } 
  }

  ngAfterContentChecked() {
    this.ref.detectChanges()
  }


}
