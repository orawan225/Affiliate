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
  checkLogin: boolean = true
  showCardRole: string = ""

  constructor(private callApi: CallApiService, private cookie: CookieServiceService, private router: Router,
    private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.checkLogout()
    this.getRoleProfile()
  }



  getRoleProfile() {
    if (this.cookie.getRoleAccount()) {
      this.showCardRole = this.cookie.getRoleAccount()
    }
  }

  routeToPage() {
    const _role = this.cookie.getRoleAccount();
    if (_role.toUpperCase() === "ADMIN") {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/home']);
    }
  }

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

