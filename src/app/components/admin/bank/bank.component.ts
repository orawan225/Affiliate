import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { affiliate } from 'src/app/models/affiliate';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  formBank: any
  bank: any
  bankNameAccount: any
  bankName: any
  bankNumber: any
  file: any

  constructor(private callApi: CallApiService, private cookie: CookieServiceService,
    private fb: FormBuilder, private router: Router, public dialogRef: MatDialogRef<BankComponent>,
    private alert: AlertService) {

    this.formBank = fb.group({
      bankNameAccount: [null],
      bankName: [null],
      bankNumber: [null]
    })

  }

  patchValue(receiveProfile: affiliate) {
    this.formBank.patchValue({
      bankName: receiveProfile.bankName,
      bankNameAccount: receiveProfile.bankNameAccount,
      bankNumber: receiveProfile.bankNumber,
    })
  }

  ngOnInit(): void {
    this.getBank()
  }

  getBank() {
    this.callApi.getBankAccount().subscribe((res: any) => {
      this.bank = res
      this.patchValue(this.bank)
 
    })
  }

  editBank() {
    this.callApi.editBank(this.formBank.value).subscribe(data => {
      //console.log(data);
      this.alert.success("แก้ไขข้อมูลสำเร็จ")
      this.closeDialog()
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
