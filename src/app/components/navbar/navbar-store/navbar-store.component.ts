import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-navbar-store',
  templateUrl: './navbar-store.component.html',
  styleUrls: ['./navbar-store.component.css']
})
export class NavbarStoreComponent implements OnInit {

  profile: any = []
  role?: string
  checkLogin: boolean = true

  constructor(public callApi: CallApiService, private cookie: CookieServiceService, private router: Router, private ref: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.checkLogout()
  }

  // <---- checkRoleAccuont ---->
  getProfile() {
    this.callApi.getProfile().subscribe((res: any) => {
      this.profile = res.data.profile
      this.role = this.profile.role
    })
  }

  checkProfile(role: any) {
    this.cookie.setRoleAccount(role)
  }

  // <---- checkLogout ---->
  checkLogout() {
    if (this.cookie.getToken()) {
      this.checkLogin = true
    } else {
      this.checkLogin = false
    }
  }

  logout() {
    this.cookie.clearCookie()
    this.checkLogout()
    this.router.navigate(['/login'])
  }


  ngAfterContentChecked() {
    this.ref.detectChanges()
  }

}
