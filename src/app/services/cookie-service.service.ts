import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieServiceService {
  helper$ = new JwtHelperService()
  constructor(private cookie: CookieService, private router: Router) { }

  _token: string = "token"

  getUserId(): string {
    let userId;
    try {
      if (!this.checkToken()) {
        userId = this.helper$.decodeToken(this.getToken()).principal
      }

      else userId = ""
      return userId;

    } catch (error) {
      this.clearCookie()
      this.router.navigate(['/login'])
      throw new Error("เข้าสู่ระบบใหม่");
    }


  }

  setToken(token: string): void {
    this.cookie.set(this._token, token)
  }

  getToken(): string {
    let token = this.cookie.get(this._token)
    try {
      this.helper$.decodeToken(this.cookie.get(token))
      return token

    } catch (error) {
      this.clearCookie()
      this.router.navigate(['/login'])
      throw new Error("เข้าสู่ระบบใหม่");


    }
  }

  clearCookie() {
    this.cookie.deleteAll()
  }

  setRoleAccount(data: string) {
    this.cookie.set('roleAccount', data)
  }

  getRoleAccount() {
    let data = this.cookie.get('roleAccount')
    return data
  }

  checkToken(): boolean {
    try {
      return this.helper$.isTokenExpired(this.getToken())
    } catch (error) {
      this.clearCookie()
      this.router.navigate(['/login'])
      throw new Error("เข้าสู่ระบบใหม่");

    }

  }


}
