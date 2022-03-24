import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent implements OnInit {

  formRegister: any;
  
  constructor(public callApi: CallApiService, public fb: FormBuilder, public router: Router ) {
    this.formRegister = fb.group({
      fullName: [null],
      customerName: [null],
      passWord: [null],
      email: [null],
      tel: [null],
      adderss: [null],
      sub: [null],
      district: [null],
      provincs: [null],
      postalCode: [null]
    })
  }

  ngOnInit(): void {
  }

  registerCustomer() {
    console.log(this.formRegister.value);
    this.callApi.registerCustomer(this.formRegister.value).subscribe(data => {
      console.log(data);
      this.router.navigate(['/logincustomer'])
    })
  }




}
