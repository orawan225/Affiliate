import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CartService } from 'src/app/services/cart.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { ProfileUpdateComponent } from '../../profile/profile-update/profile-update.component';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent implements OnInit {

  productList: any = []
  formPayment: any
  file: any
  formAddress: any
  profile: any = []
  TotalAmount: any
  TotalPrice: any
  orderList: any
  StoreId:any

  productApiforCheckStatus: any = [];



  constructor(private fb: FormBuilder, public cartService: CartService, private callApi: CallApiService,
    private dialog: MatDialog, private router: Router, private alert: AlertService, private cookie: CookieServiceService,) { }

  ngOnInit(): void {
    this.getProfile()
    this.getProductByStoreId()
    this.getProductById();
  }

  getProfile() {
    const _auth: boolean = this.cookie.getToken() ? true : false;
    if (_auth) {
      this.callApi.getProfile().subscribe((res: any) => {
        this.profile = res.data.profile
      })
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProfileUpdateComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getProfile()
    });
  }

  getProductByStoreId() {
    this.StoreId = localStorage.getItem("storeId"); 
    if (this.StoreId) {
      this.productList = this.cartService.getCart()

      this.productList = this.productList.filter((element: any) => element.storeId == this.StoreId);
      if (this.productList.length) {
        this.TotalAmount = this.cartService.getTotalAmount(this.StoreId)
        this.TotalPrice = this.cartService.getTotalPrice(this.StoreId)
      }
      console.log(this.productList);
    }
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
    // console.log(products);
    this.orderList = this.fb.group({
      fullName: this.profile.fullName,
      tel: this.profile.tel,
      address: this.profile.address,
      sub: this.profile.sub,
      district: this.profile.district,
      province: this.profile.province,
      postalCode: this.profile.postalCode,
      storeId: this.StoreId,
      products: [products]
    })
    console.log(this.orderList);
    if (productStatusFalse.length == 0) {
      this.callApi.addOrderDetail(this.orderList.value).subscribe((res: any) => {
        console.log(res);
        this.alert.success("สั่งซื้อสินค้าสำเร็จ")
        setTimeout(() => {
          this. setOrderListId(res.orderListId)
          // this.router.navigate(['/payment'])

        }, 1000);
      })
    }

  }

  setOrderListId(orderListId : string) {
    this.router.navigate(['/payment'],{queryParams: {id:orderListId}})
    console.log(orderListId);
  }

}

