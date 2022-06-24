import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-register-shop',
  templateUrl: './register-shop.component.html',
  styleUrls: ['./register-shop.component.css']
})
export class RegisterShopComponent implements OnInit {

  formRegister: any;

  constructor(public callApi: CallApiService, public fb: FormBuilder, public router: Router, private cookie: CookieServiceService) {
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
    console.log(this.formRegister.value);
    this.callApi.registerStore(this.formRegister.value).subscribe((res: any) => {
      console.log(res);
      // this.router.navigateByUrl('/loginshop')
    })
  }
}
