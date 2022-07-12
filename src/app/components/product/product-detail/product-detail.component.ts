import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { product } from 'src/app/models/product';
import { CallApiService } from 'src/app/services/call-api.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  formProduct: any
  productId: any
  user: any;
  api = environment.apiUrl
  product: any = []


  constructor(private callApi: CallApiService, private router: Router, private fb: FormBuilder, 
    private acrout: ActivatedRoute, private cartService: CartService) {
    this.formProduct = fb.group({
      productId: [null],
      productName: [null],
      productPrice: [null],
      productDetail: [null]
    })

    acrout.queryParams.subscribe((res: any) => {
      console.log(res.id);
      this.productId = res.id
      console.log(res.user);
      this.user = res.user || 0
    })

  }

  patchValue(receiveProduct: product) {
    this.formProduct.patchValue({
      productId: receiveProduct.productId,
      productName: receiveProduct.productName,
      productPrice: receiveProduct.productPrice,
      productDetail: receiveProduct.productDetail,
    })
  }


  ngOnInit(): void {
    this.getProductById()

  }

  getProductById() {
    this.callApi.getProductById(this.productId).subscribe((res: any) => {
      this.product = res
      this.patchValue(res)
      // this.product.image = this.api+res.gata.image
      console.log();
      

    })
  }

  setProductIdtolocal(product: any) {
    product.amount = 1;
    product.user = this.user
    this.cartService.addCart(product, true)
    this.router.navigate(['/cart'])
  }




}
