import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { profile } from 'src/app/models/profile';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { environment } from 'src/environments/environment';
import { ProfileAffiliateComponent } from '../profile-affiliate/profile-affiliate.component';
import { ProfileStoreComponent } from '../profile-store/profile-store.component';
import { ProfileUpdateComponent } from '../profile-update/profile-update.component';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})

export class ProfileUserComponent implements OnInit {
  formProfile: any
  file: any
  profile: any = []
  store: any = []
  affiliate: any = []
  role?: string
  showCardRole: any
  img: any
  api = environment.apiUrl
  totalPrice = 0

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

    this.store = cookie.getUserId();  
    console.log(this.store);
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
    // this.getmoneyStore()
  }

  profileUser() {
    const dialogRef = this.dialog.open(ProfileUpdateComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getProfile()
    });
  }

  profileStore() {
    const dialogRef = this.dialog.open(ProfileStoreComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getProfile()
    });
  }

  profileAffiliate() {
    const dialogRef = this.dialog.open(ProfileAffiliateComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getProfile()
    });
  }

  getProfile() {
    const _auth: boolean = this.cookie.getToken() ? true : false;
    if (_auth) {
      this.callApi.getProfile().subscribe((res: any) => {
        this.profile = res.data.profile
        this.store = res.data.profile.store
        this.affiliate = res.data.profile.affiliate
        this.img = this.api + this.profile.image
        this.patchValue(this.profile)
        console.log(res);

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
      console.log(data);
      this.alert.success("แก้ไขรูปโปรไฟล์สำเร็จ")
    })

  }

  // getmoneyStore() {
  //   this.callApi.getTotalMoney().subscribe((res: any) => {
  //     this.totalPrice = res.data.total_price
  //     console.log(res.total_price);
  //     console.log(res);
      
  //   })
  // }


  // wathdrawMoney() {
  //   this.alert.warning("ต้องการถอนเงินใช่หรือไม่ ?").then((result) => {
  //     if (result.isConfirmed) {
  //       this.callApi.wathdrawMoney(this.store).subscribe(data => {
  //         console.log(data);
  //       })
  //       this.alert.success("ทำการถอนเงินสำเร็จ")
  //       this.getProfile()
  //     } 
  //   })
  // }


  selectFile(event: any) {
    this.file = <File>event.target.files[0]
    const image = new FileReader();
    image.readAsDataURL(this.file)
    image.onload = () => {
      this.img = image.result
    }
  }

  getRoleProfile() {
    if (this.cookie.getRoleAccount()) {
      this.showCardRole = this.cookie.getRoleAccount()
    }
  }

  ngAfterContentChecked() {
    this.ref.detectChanges()
  }

}
