import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent implements OnInit {

  formRegister: any
  checkLogin: boolean = true
  
  constructor(private callApi: CallApiService, private fb: FormBuilder, private router: Router, private cookie: CookieServiceService) {
    this.formRegister = fb.group({
      bankNameAccount: [null],
      bankNumber: [null],
      bankName: [null]
    })
  }

  ngOnInit(): void {
  }

  registerCustomer() {
    this.callApi.registerCustomer(this.formRegister.value).subscribe((res: any)=> {
      console.log(res);
      
      if (this.cookie.getToken()) {
        this.checkLogin = true
        this.router.navigate(['/home'])
      } else {
        this.checkLogin = false
        this.router.navigate(['/login'])
      }
    })
  }
}
