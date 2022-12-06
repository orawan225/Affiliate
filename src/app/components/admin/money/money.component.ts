import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.css']
})
export class MoneyComponent implements OnInit {

  file: any
  img: any = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
  withdrawId: any
  user: any
  bank: any
  banknumber: any
  namebank: any
  name: any
  address: any
  sub: any
  district: any
  province: any
  postalCode: any
  tel: any
  totalPrice: any

  constructor(private callApi: CallApiService, private cookie: CookieServiceService, private router: Router,
    private acrout: ActivatedRoute, private alert: AlertService) {

    acrout.queryParams.subscribe((res: any) => {
      this.withdrawId = res.id
    })
  }

  ngOnInit(): void {
    this.getWiithdrawById()
  }

  getWiithdrawById() {
    this.callApi.getWithdrawById(this.withdrawId).subscribe((res: any) => {
      this.user = res.store.store
      this.bank = res.store.bankNameAccount
      this.banknumber = res.store.bankNumber
      this.namebank = res.store.bankName
      this.name = res.user.fullName
      this.address = res.user.address
      this.sub = res.user.sub
      this.district = res.user.district
      this.province = res.user.province
      this.postalCode = res.user.postalCode
      this.tel= res.user.tel
      this.totalPrice = res.totalPrice
      console.log(res);
    })
  }

  createWithdraw() {
    let fileData = new FormData()
    fileData.append('file', this.file)
    this.callApi.updateOrderWithdraw(this.withdrawId, fileData).subscribe((res: any) => {
      this.alert.success("โอนเงินสำเร็จ")
      setTimeout(() => {
        this.router.navigate(['/dashboard'])
      }, 1000);
    })
  }



  selectFile(event: any) {
    this.file = <File>event.target.files[0]
    const image = new FileReader();
    image.readAsDataURL(this.file)
    image.onload = () => {
      this.img = image.result
    }
  }

}
