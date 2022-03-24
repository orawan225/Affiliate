import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.css']
})
export class LoginCustomerComponent implements OnInit {

  formLogin: any;
  
  constructor(public callApi: CallApiService, public fb: FormBuilder, private router: Router,private alert :AlertService) {
    this.formLogin = fb.group({
      customerName: [null],
      passWord: [null]
    })
  }

  ngOnInit(): void {
  }

  loginCustomer() {
    console.log(this.formLogin.value);
    
    this.callApi.loginCustomer(this.formLogin.value).subscribe(data => {
      this.alert.success("เข้าสู่ระบบสำเร็จ")
    },((err:any)=>{
      if (err.status===417) {
        this.alert.error(err.error.message)
      }
    }))
  }

}
