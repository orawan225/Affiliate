import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent implements OnInit {

  formRegister: any
  checkLogin: boolean = true
  submitAdd: boolean = false;

  constructor(private callApi: CallApiService, private fb: FormBuilder, private router: Router,
    private cookie: CookieServiceService, private alert: AlertService) {
    this.formRegister = fb.group({
      bankNameAccount: [null, [Validators.required]],
      bankNumber: [null, [Validators.required,Validators.pattern('^[0-9]*$'), Validators.minLength(10)]],
      bankName: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  get formValidAdd() {
    return this.formRegister.controls;
  }

  onChange() {
    this.submitAdd = true
  }

  getProfile() {
    this.callApi.getProfile().subscribe((res: any) => {
      this.cookie.setRoleAccount(res.data.profile.role) 
      window.location.reload();
    })
  }



  registerCustomer() {
    this.submitAdd = true;
    if (this.formRegister.valid) {
      this.callApi.registerAffiliate(this.formRegister.value).subscribe((res: any) => {
        this.getProfile()
        //console.log(res);
        this.alert.success("สมัครสมาชิกสำเร็จ")
        if (this.cookie.getToken()) {
          this.checkLogin = true
          this.router.navigate(['/home'])
        } else {
          this.checkLogin = false
          this.router.navigate(['/login'])
        }
      }, ((err: any) => {
        if (err.status === 417) {
          this.alert.error(err.error.message)
        }
      }))
    }
  }
}
