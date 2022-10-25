import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


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
