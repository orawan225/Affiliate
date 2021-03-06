import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.component.html',
  styleUrls: ['./register-store.component.css']
})
export class RegisterStoreComponent implements OnInit {

  formRegister: any;
  checkLogin: boolean = true

  constructor(private callApi: CallApiService, private fb: FormBuilder, private router: Router, private cookie: CookieServiceService) {
    this.formRegister = fb.group({
      store: [null],
      bankNameAccount: [null],
      bankNumber: [null],
      bankName: [null]
    })
  }

  ngOnInit(): void {
  }

  registerStore() {
    this.callApi.registerStore(this.formRegister.value).subscribe((res: any) => {
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