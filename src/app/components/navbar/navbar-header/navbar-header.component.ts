import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.css']
})
export class NavbarHeaderComponent implements OnInit {

  profile: any = []
  role?: string
  checkLogin: boolean = true

  constructor(private callApi: CallApiService, private cookie: CookieServiceService, private router: Router, 
    private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.checkLogout()
    this.getProfile()
  }


  // <---- checkRoleAccuont ---->
  getProfile() {
    const _auth: boolean = this.cookie.getToken() ? true : false;
    if (_auth) {
      this.callApi.getProfile().subscribe((res: any) => {
        this.profile = res.data.profile;
        this.role = res.data.profile.role;
        console.log(this.role);
      })
    }
  }

  checkProfile(role: any) {
    // this.cookie.setRoleAccount(role)
    // window.location.href = "/profile-user"
  }

  routeToPage() {
    const _role = this.cookie.getRoleAccount();
    if (_role.toUpperCase() === "ADMIN") {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/home']);
    } 
  }


  
  // <---- checkButtonLout---->
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



   // <---- checkButtonStore---->
  // loginStore() {
  //   if (this.cookie.getToken()) {
  //     this.checkLogin = true
  //     this.router.navigate(['/product-store'])
  //   } else {
  //     this.checkLogin = false
  //     this.router.navigate(['/login'])
  //   }
  // }

  // <---- checkButtonStore---->
  // checkOrderStore() {
  //   if (this.cookie.getToken()) {
  //     this.checkLogin = true
  //     this.router.navigate(['/order-store'])
  //   } else {
  //     this.checkLogine = fals
  //     this.router.navigate(['/login'])
  //   }
  // }

  ngAfterContentChecked() {
    this.ref.detectChanges()
  }

}
