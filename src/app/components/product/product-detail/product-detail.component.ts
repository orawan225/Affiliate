import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { product } from 'src/app/models/product';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  formProduct: any
  productList: any = []
  productId: any


  constructor(private callApi: CallApiService, private router: Router, private fb: FormBuilder, private acrout: ActivatedRoute) {
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
    // let productId = localStorage.getItem('productId')
    // console.log(productId);
    this.callApi.getProductById(this.productId).subscribe((res: any) => {
      this.productList = res
      this.patchValue(res)
      console.log(this.formProduct);

    })
  }

  setProductIdtolocal(productId: string) {
    localStorage.setItem('productId', productId)
    this.router.navigate(['/cart'])
  }




}
