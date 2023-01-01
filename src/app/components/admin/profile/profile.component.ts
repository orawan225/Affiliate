import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { profile } from 'src/app/models/profile';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { environment } from 'src/environments/environment';
import { ProfileAdminComponent } from '../profile-admin/profile-admin.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  img: any
  api = environment.apiUrl
  file: any
  formProfile: any
  profile: any
  fullName: any
  email: any
  tel: any
  address: any
  sub: any
  district: any
  province: any
  postalCode: any

  constructor(private callApi: CallApiService, private cookie: CookieServiceService,
    private ref: ChangeDetectorRef, private fb: FormBuilder, private router: Router,
    private dialog: MatDialog, private alert: AlertService) {
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
  }

  getProfile() {
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
      this.img = this.api+ res.image
      this.patchValue(this.profile)
      console.log(res);
    })
  }

  profileAdmin() {
    const dialogRef = this.dialog.open(ProfileAdminComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getProfile()
    });
  }

  editProfile() {
    const data = new FormData()
    if (this.file) {
      data.append('file', this.file, this.file.name)
    }
    data.append('profile', JSON.stringify(this.formProfile.value))
    this.callApi.editProfileAdmin(data).subscribe(data => {
      console.log(data);
      this.alert.success("แก้ไขรูปโปรไฟล์สำเร็จ")
    })
  }

  selectFile(event: any) {
    this.file = <File>event.target.files[0]
    const image = new FileReader();
    image.readAsDataURL(this.file)
    image.onload = () => {
      this.img = image.result
    }
  }

  ngAfterContentChecked() {
    this.ref.detectChanges()
  }

}
