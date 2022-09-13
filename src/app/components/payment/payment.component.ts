import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { orderDetail, orderList } from 'src/app/models/order';
import { product } from 'src/app/models/product';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CartService } from 'src/app/services/cart.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { ProfileUpdateComponent } from '../profile/profile-update/profile-update.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  productList: any = []
  formPayment: any
  file: any
  img: any = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
  formAddress: any
  profile: any = []
  TotalAmount: any
  TotalPrice: any
  orderListId: any
  producs: any
  user?: string = undefined;

  productApiforCheckStatus: any = [];

  orderList: orderList = new orderList()
  count = 0


  constructor(public cartService: CartService, private callApi: CallApiService, private cookie: CookieServiceService,
    private router: Router, private acrout: ActivatedRoute) {

    this.user = cookie.getUserId();
    console.log(this.user);

    acrout.queryParams.subscribe((res: any) => {
      this.orderListId = res.id
      this.getProductByStoreId(res.id)
    })

  }

  ngOnInit(): void {

    this.user = this.cookie.getUserId();
    console.log(this.user);

  }




  getProductByStoreId(orderId: any) {
    this.callApi.getOrderDetail(orderId).subscribe((res: orderList) => {
      // this.productList = res.detail
      this.orderList = res
      console.log(res);
      this.orderList.totalAmount = 0
      this.orderList.detail.forEach((element: orderDetail) => {
        console.log(typeof element.amount);

        this.orderList.totalAmount += element.amount
      });
      console.log(this.orderList);

    })
  }


  createPayment() {
    let fileData = new FormData()
    fileData.append('file', this.file, this.file.name)
    this.callApi.createPayment(this.orderListId, fileData).subscribe((res: any) => {
      console.log(res);
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
