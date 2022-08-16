import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { product } from 'src/app/models/product';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CartService } from 'src/app/services/cart.service';
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
  orderList: any
  producs: any


  productApiforCheckStatus: any = [];



  constructor(public cartService: CartService, private callApi: CallApiService,
    private router: Router, private acrout: ActivatedRoute) {

    // acrout.queryParams.subscribe((res: any) => {
    //   this.orderListId = res.id
    // })

  }

  ngOnInit(): void {
    this.getProductByStoreId()

  }


  getProductByStoreId() {
    this.callApi.getAllOrderDetail().subscribe((res: any) => {
      this.productList = res
      console.log(res);
      
    })
  }


  createPayment(orderListId: any) {
    let fileData = new FormData()
    fileData.append('file', this.file, this.file.name)

    // this.callApi.createOrder(orderListId, fileData).subscribe((res: any) => {
    //   console.log(res);
    // })
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
