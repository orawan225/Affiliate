import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.component.html',
  styleUrls: ['./register-store.component.css']
})
export class RegisterStoreComponent implements OnInit {

  formRegister: any;
  checkLogin: boolean = true
  submitAdd: boolean = false;

  constructor(private callApi: CallApiService, private fb: FormBuilder, private router: Router,
    private cookie: CookieServiceService, private alert: AlertService) {
    this.formRegister = fb.group({
      store: [null, [Validators.required]],
      bankNameAccount: [null, [Validators.required]],
      bankNumber: [null, [Validators.required,Validators.pattern('^[0-9]*$')]],
      bankName: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  get formValidAdd() {
    return this.formRegister.controls;
  }

  onChange() {
    this.submitAdd = false
  }



  registerStore() {
    this.submitAdd = true;
    if (this.formRegister.valid) {
      this.callApi.registerStore(this.formRegister.value).subscribe((res: any) => {
        console.log(res);
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