import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieServiceService {

  constructor(private cookie :CookieService) { }

  _token: string = "token"

  setToken(token: string): void{
    this.cookie.set(this._token,token)
  }

  getToken():string {
      return this.cookie.get(this._token)
  }

  clearCookie(){
    this.cookie.deleteAll()
  }

  setRoleProfile(data: string){
    this.cookie.set('roleProfile',JSON.stringify(data))
  }

  getRoleProfile(){
   let data = this.cookie.get('roleProfile')
   
    if(data){
      return JSON.parse(data)
    }
  }

}
