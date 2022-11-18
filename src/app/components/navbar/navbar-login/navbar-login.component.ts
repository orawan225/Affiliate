import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-navbar-login',
  templateUrl: './navbar-login.component.html',
  styleUrls: ['./navbar-login.component.css']
})
export class NavbarLoginComponent implements OnInit {

  constructor(
    private cookie: CookieServiceService, 
    private router: Router
  ) { }

  ngOnInit(): void {
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
