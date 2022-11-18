import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-navbar-register',
  templateUrl: './navbar-register.component.html',
  styleUrls: ['./navbar-register.component.css']
})
export class NavbarRegisterComponent implements OnInit {

  profile: any = []
  role?: string
  checkLogin: boolean = true

  constructor(private callApi: CallApiService, private cookie: CookieServiceService, private router: Router, private ref: ChangeDetectorRef) { 

  }

  ngOnInit(): void {
    this.checkLogout()
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

  routeToPage() {
    const _role = this.cookie.getRoleAccount();
    if (_role.toUpperCase() === "ADMIN") {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/home']);
    } 
  }

}
