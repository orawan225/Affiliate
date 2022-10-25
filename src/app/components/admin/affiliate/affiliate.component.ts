import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-affiliate',
  templateUrl: './affiliate.component.html',
  styleUrls: ['./affiliate.component.css']
})
export class AffiliateComponent implements OnInit {


  profile: any = []
  role?: string
  checkLogin: boolean = true

  constructor(private callApi: CallApiService, private cookie: CookieServiceService, private router: Router) { }

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


}
