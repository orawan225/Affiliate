import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { profile } from 'src/app/models/profile';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { environment } from 'src/environments/environment';
import { BankComponent } from '../bank/bank.component';
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
  bankNameAccount: any
  bankName: any
  bankNumber: any

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
    this.getBankAccount()
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
      this.img = this.api + res.image
      this.patchValue(this.profile)
      //console.log(res);
    })
  }

  getBankAccount() {
    this.callApi.getBankAccount().subscribe((res: any) => {
      this.bankNameAccount = res.bankNameAccount
      this.bankName = res.bankName
      this.bankNumber = res.bankNumber
      //console.log(this.bankNameAccount);

    })

  }

  profileAdmin() {
    const dialogRef = this.dialog.open(ProfileAdminComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getProfile()
    });
  }

  bank() {
    const dialogRef = this.dialog.open(BankComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getProfile()
      window.location.reload();
    });
  }

  editProfile() {
    const data = new FormData()
    if (this.file) {
      data.append('file', this.file, this.file.name)
    }
    data.append('profile', JSON.stringify(this.formProfile.value))
    this.callApi.editProfileAdmin(data).subscribe(data => {
      //console.log(data);
      this.alert.success("แก้ไขรูปโปรไฟล์สำเร็จ")
    }, ((err: any) => {
      if (err.status === 500) {
        this.alert.warnings("โปรดเลือกรูปภาพที่มีขนาดน้อยกว่า 1MB")
      }
    }))
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
