import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formProfile: any
  profile: any = []
  store: any = []
  customer: any = []
  role?: string 
  showCardRole: any

  constructor(private callApi: CallApiService, private cookie: CookieServiceService, private ref: ChangeDetectorRef) {
    this.getRoleProfile()
  }

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile() {
    this.callApi.getProfile().subscribe((res: any) => {
      this.profile = res.data.profile
      this.store = res.data.profile.store
      this.customer = res.data.profile.customer
      console.log(res.data);
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
