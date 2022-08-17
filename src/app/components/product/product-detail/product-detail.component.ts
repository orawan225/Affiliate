import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/models/product';
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
  affiliate: any;
  api = environment.apiUrl
  product: any = []
  showCardRole: any
  profile: any = []
  role?: string


  constructor(private callApi: CallApiService, private router: Router, private fb: FormBuilder, 
    private acrout: ActivatedRoute, private cartService: CartService, private cookie: CookieServiceService) {
    this.formProduct = fb.group({
      productId: [null],
      productName: [null],
      productPrice: [null],
      productDetail: [null]
    })

    acrout.queryParams.subscribe((res: any) => {
      this.productId = res.id
      this.affiliate = res.affiliate || 0

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

  addProductToCart(product: any) {
    product.amount = 1;
    product.affiliate = this.affiliate
    this.cartService.addCart(product, true)
    this.router.navigate(['/cart'])
  }

  shareProduct(productId : string) {
    this.router.navigate(['/product-share'],{queryParams: {id:productId}})
  }

  getProfile() {
    this.callApi.getProfile().subscribe((res: any) => {
      this.profile = res.data.profile
      this.role = this.profile.role
      console.log(this.profile);
    })
  }

}
