import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  submitAdd: boolean = false;
  formRegister: any

  constructor(private callApi: CallApiService, private fb: FormBuilder, private router: Router, private http: HttpClient,
    private alert: AlertService) {
    this.formRegister = this.fb.group({
      fullName: [null, Validators.required],
      userName: [null, Validators.required],
      passWord: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      tel: [null, [Validators.required,Validators.pattern('^[0-9]*$'), Validators.minLength(10)]],
      address: [null, Validators.required],
      sub: [null, Validators.required],
      district: [null, Validators.required],
      province: [null, Validators.required],
      postalCode: [null, [Validators.required,Validators.pattern('^[0-9]*$'), Validators.minLength(5)]]
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


  registerUser() {
    this.submitAdd = true;
    if (this.formRegister.valid) {
      this.callApi.registerUser(this.formRegister.value).subscribe(async (data) => {
        //console.log(data);
        await this.alert.success("สมัครสมาชิกสำเร็จ")
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 1000);
      }, ((err: any) => {
        if (err.status === 417) {
          this.alert.error(err.error.message)
        }
      }))
    }
  }
}

