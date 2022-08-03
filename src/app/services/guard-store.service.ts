import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieServiceService } from './cookie-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardStoreService implements CanActivate{

  constructor(private cookie: CookieServiceService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    this.cookie.helper$.decodeToken(this.cookie.getToken())
    // console.log(this.cookie.helper$.decodeToken(this.cookie.getToken()))

    if (!this.cookie.checkToken()) {
      if(this.cookie.getRoleAccount() == "STORE" || this.cookie.getRoleAccount() == "ST_AF"){
        return true
      }
      else {
        window.history.back()
        return false
      }
    }
    else {
      this.cookie.clearCookie()
      this.router.navigate(['/login'])
      return false
    }

    



  }
}
