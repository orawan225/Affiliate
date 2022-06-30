import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.component.html',
  styleUrls: ['./register-store.component.css']
})
export class RegisterStoreComponent implements OnInit {

  formRegister: any;

  constructor(public callApi: CallApiService, public fb: FormBuilder, public router: Router) {
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
      this.router.navigateByUrl('/login')
    })
  }
}
