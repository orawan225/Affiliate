import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { product } from '../models/product';

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

  setRoleAccount(data: string){
    this.cookie.set('roleAccount',JSON.stringify(data))
  }

  getRoleAccount(){
   let data = this.cookie.get('roleAccount')
    if(data){
      return JSON.parse(data)
    }
  }

}
