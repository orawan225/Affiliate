import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CartService } from 'src/app/services/cart.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  formProduct: any
  productId: any
  link: any;
  api = environment.apiUrl
  product: any = []
  showCardRole: any
  profile: any = []
  role: string = ""
  storeId: number = 0;


  constructor(private callApi: CallApiService, private router: Router, private fb: FormBuilder,
    private acrout: ActivatedRoute, private cartService: CartService, private cookie: CookieServiceService,
    private alert: AlertService) {
    this.formProduct = fb.group({
      productId: [null],
      productName: [null],
      productPrice: [null],
      productDetail: [null]
    })

    acrout.queryParams.subscribe((res: any) => {
      this.productId = res.id
      this.link = res.link || null
    })
  }

  ngOnInit(): void {
    this.getProductById()
    this.getRoleProfile()
  }

  getProductById() {
    this.callApi.getProductById(this.productId).subscribe((res: any) => {
      this.product = res
      //console.log(res);
    })
  }

  getRoleProfile() {
    if (this.cookie.getRoleAccount()) {
      this.showCardRole = this.cookie.getRoleAccount()
      //console.log(this.showCardRole); 
    }
  }



  addProductToCart(product: any) {
    if (this.cookie.checkToken()) {
      this.alert.error("กรุณาเข้าสู่ระบบ")

      setTimeout(() => {
        this.router.navigate(['/login'])
      }, 1000);
      return
    }

    this.callApi.getProfile().subscribe((res: any) => {
      // console.log(res);

      if (res.data.profile.role == "STORE" || res.data.profile.role == "ST_AF") {

        this.storeId = res.data.profile.store.storeId
        // console.log(this.storeId);
        // console.log(res);

        if (this.storeId == this.product.storeId) {
          this.alert.error("ไม่สามารถสั่งซื้อสินค้าจากร้านตนเองได้");
          return
        }
      }
      product.amount = 1;
      product.linkId = this.link
      this.cartService.addCart(product, true)
      this.router.navigate(['/cart'])
    }, ((err: any) => {
      // console.log(err);
      if (err.status === 403) {
        this.alert.error("กรุณาเข้าสู่ระบบ")

        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 1000);
      }
    })
    )

  }

  shareProduct(productId: string) {
    this.router.navigate(['/product-share'], { queryParams: { id: productId } })
  }

  productByStore(storeId: string) {
    this.router.navigate(['/productByStore'], { queryParams: { id: storeId } })
  }
}
