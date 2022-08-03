import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private fb: FormBuilder, public cartService: CartService, private callApi: CallApiService,
    private dialog: MatDialog) {
    this.formPayment = fb.group({
      price: [null],
      day: [null],
      time: [null]
    }),

    this.orderList = fb.group({
      fullName: [null],
      tel: [null],
      address: [null],
      sub: [null],
      district: [null],
      province: [null],
      postalCode: [null],
      products: [{
        productId: [null],
        productAmount: [null],
      }]
    })
  }



  ngOnInit(): void {
    this.getProductByStoreId()
    this.getProfile()
  }

  getProfile() {
    this.callApi.getProfile().subscribe((res: any) => {
      this.profile = res.data.profile
      console.log(this.profile);
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProfileUpdateComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getProductByStoreId() {
    let StoreId = localStorage.getItem("storeId");

    if (StoreId) {
      this.productList = this.cartService.getCart()

      this.productList = this.productList.filter((element: any) => element.storeId == StoreId);
      if (this.productList.length) {
        this.TotalAmount = this.cartService.getTotalAmount(StoreId)
        this.TotalPrice = this.cartService.getTotalPrice(StoreId)
      }
      console.log(this.productList);
    }
  }

  createPayment() {
    const fileData = new FormData()
    fileData.append('file', this.file, this.file.name)
    // fileData.append('order', JSON.stringify(this.formPayment.value))
    // console.log(this.formPayment.value);
    this.callApi.createOrder(fileData).subscribe((res: any) => {
      console.log(res);
    })
  }

  addOrderDetail() {
    this.callApi.addOrderDetail(this.orderList.value).subscribe(res => {
      console.log(res);
    })
  }


  selectFile(event: any) {
    this.file = <File>event.target.files[0]
    const image = new FileReader();
    image.readAsDataURL(this.file)
    image.onload = () => {
      this.img = image.result
      console.log(this.img);
    }
  }

}
