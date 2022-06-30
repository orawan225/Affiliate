import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent implements OnInit {

  formRegister: any
  
  constructor(public callApi: CallApiService, public fb: FormBuilder, public router: Router) {
    this.formRegister = fb.group({
      bankNameAccount: [null],
      bankNumber: [null],
      bankName: [null]
    })
  }

  ngOnInit(): void {
  }

  registerCustomer() {
    console.log(this.formRegister.value);
    this.callApi.registerCustomer(this.formRegister.value).subscribe((res: any)=> {
      console.log(res);
      this.router.navigate(['/login'])
    })
  }


}
