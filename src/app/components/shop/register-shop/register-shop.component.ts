import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-shop',
  templateUrl: './register-shop.component.html',
  styleUrls: ['./register-shop.component.css']
})
export class RegisterShopComponent implements OnInit {

  formRegister: any;

  constructor(public callApi: CallApiService, public fb: FormBuilder, public router: Router ) {
    this.formRegister = fb.group({
      storeName: [null],
      passWord: [null],
      store: [null],
      address: [null],
      sub: [null],
      district: [null],
      province: [null],
      postalCode: [null],
      fullName: [null],
      email: [null],
      tel: [null],
      bankNumber: [null],
      bankNameAccount: [null]
    })
  }

  ngOnInit(): void {
  }

  registerStore() {
    console.log(this.formRegister.value);
    this.callApi.registerStore(this.formRegister.value).subscribe(data => {
      console.log(data);
    })
  }
}
