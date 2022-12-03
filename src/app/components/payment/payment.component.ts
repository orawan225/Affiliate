import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { orderDetail, orderList } from 'src/app/models/order';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CartService } from 'src/app/services/cart.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

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
    private router: Router, private acrout: ActivatedRoute,private alert: AlertService) {

    // this.user = cookie.getUserId();

    acrout.queryParams.subscribe((res: any) => {
      this.orderListId = res.id
      this.getProductByStoreId(res.id)
    })

  }

  ngOnInit(): void {
    this.user = this.cookie.getUserId();

  }

  getProductByStoreId(orderId: any) {
    this.callApi.getOrderDetail(orderId).subscribe((res: orderList) => {
      // this.productList = res.detail
      this.orderList = res
      this.orderList.totalAmount = 0
      this.orderList.detail.forEach((element: orderDetail) => {
        this.orderList.totalAmount += element.amount
      });
    })
  }


  createPayment() {
    let fileData = new FormData()
    fileData.append('file', this.file)
    this.callApi.createPayment(this.orderListId, fileData).subscribe((res: any) => {
      console.log(res);
      this.alert.success("เพิ่มสินค้าสำเร็จ")
      setTimeout(() => {
        this.router.navigate(['/home'])
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
