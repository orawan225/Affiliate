import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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


  productApiforCheckStatus: any = [];



  constructor(private fb: FormBuilder, public cartService: CartService, private callApi: CallApiService,
    private dialog: MatDialog, private router: Router, private alert: AlertService) {
    // this.orderList = fb.group({
    //   fullName: "",
    //   tel: "",
    //   address: "",
    //   sub: "",
    //   district: "",
    //   province: "",
    //   postalCode: "",
    //   products: [{
    //     productId: "",
    //     amount: ""
    //   }]
    // })

  }

  ngOnInit(): void {
    this.getProductByStoreId()
    this.getProfile()


    this.getProductById();

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

  getProductById() {
    this.productList.map((item: any, index: number) => {
      this.callApi.getProductById(item.productId).subscribe((res: any) => {
        this.productApiforCheckStatus[index] = res;
      });
    })
  }


  addOrderDetail() {

    var products: any = [];
    var productStatusFalse: any = [];
    this.productList.map((item: any, index: number) => {
      if (this.productApiforCheckStatus[index].status) {
        products.push(
          {
            "productId": item.productId,
            "amount": item.amount,
          }
        )
      }
      else {
        productStatusFalse.push(item);
        this.cartService.remove(item.productId);
        this.alert.error(` ${item.productName} หมดแล้ว`);
        this.getProductByStoreId()
      }
    });

    console.log(this.productApiforCheckStatus);

    console.log(products);


    this.orderList = this.fb.group({
      fullName: this.profile.fullName,
      tel: this.profile.tel,
      address: this.profile.address,
      sub: this.profile.sub,
      district: this.profile.district,
      province: this.profile.province,
      postalCode: this.profile.postalCode,
      storeId: this.profile.store.storeId,
      products: [products]
    })
    console.log(this.orderList);
    if (productStatusFalse.length == 0) {
      this.callApi.addOrderDetail(this.orderList.value).subscribe((res: any) => {
        console.log(res);
        this.alert.success("สั่งซื้อสินค้าสำเร็จ")
        setTimeout(() => {
          this.router.navigate(['/home'])
        }, 1000);
      })
    }

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
