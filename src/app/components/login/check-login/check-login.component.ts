import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-check-login',
  templateUrl: './check-login.component.html',
  styleUrls: ['./check-login.component.css']
})
export class CheckLoginComponent implements OnInit {

  profile: any = []
  role?: string
  constructor(public callApi: CallApiService, private ref: ChangeDetectorRef, private cookie: CookieServiceService, public router: Router) { }


  ngOnInit(): void {
    this.getProfile()
  }

  getProfile() {
    this.callApi.getProfile().subscribe((res: any) => {
      this.profile = res.data.profile
      this.role = this.profile.role
      console.log(res);
    })
  }

  checkProfile(role: any){
    this.cookie.setRoleAccount(role)
  }

  
  ngAfterContentChecked() {
    this.ref.detectChanges()
  }

}
