import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieServiceService {
  helper$ = new JwtHelperService()
  constructor(private cookie: CookieService) {
    // console.log(this.helper$.isTokenExpired(this.getToken()));
    // console.log(this.helper$.decodeToken(this.getToken()).principal);
  }

  _token: string = "token"

  getUserId(): string {
    let userId;

    if (!this.checkToken()) userId = this.helper$.decodeToken(this.getToken()).principal
    else userId = ""
    return userId;
  }

  setToken(token: string): void {
    this.cookie.set(this._token, token)
  }

  getToken(): string {
    return this.cookie.get(this._token)
  }

  clearCookie() {
    this.cookie.deleteAll()
  }

  setRoleAccount(data: string) {
    this.cookie.set('roleAccount', JSON.stringify(data))
  }

  getRoleAccount() {
    let data = this.cookie.get('roleAccount')
    if (data) {
      return JSON.parse(data)
    }
  }

  checkToken(): boolean {
    return this.helper$.isTokenExpired(this.getToken())
  }

}
