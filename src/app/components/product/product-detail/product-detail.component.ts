import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/models/product';
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
  role: string=""
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
    this.getProfile()
  }

  getProductById() {
    this.callApi.getProductById(this.productId).subscribe((res: any) => {
      this.product = res
      console.log(res);
    })
  }

  getProfile() {
    const _auth: boolean = this.cookie.getToken() ? true : false;
    if (_auth) {
      this.callApi.getProfile().subscribe((res: any) => {
        this.profile = res.data.profile
        this.role = this.profile.role
        this.storeId = this.profile.store?.storeId ?? 0;
        this.cookie.setRoleAccount(this.role)
        console.log(this.profile);
      })
    }
  }


  async addProductToCart(product: any) {
    await this.callApi.getProfile().subscribe((res: any) => {
      this.storeId = this.profile.store.storeId
    })
    if (this.storeId == this.product.storeId) {
      await this.alert.error("ไม่สามารถสั่งซื้อสินค้าของร้านตนเองได้");
    }
    else {
      product.amount = 1;
      product.linkId = this.link
      this.cartService.addCart(product, true)
      this.router.navigate(['/cart'])
    }
  }

  shareProduct(productId: string) {
    this.router.navigate(['/product-share'], { queryParams: { id: productId } })
  }
}
