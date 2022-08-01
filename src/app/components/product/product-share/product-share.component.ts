import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-share',
  templateUrl: './product-share.component.html',
  styleUrls: ['./product-share.component.css']
})
export class ProductShareComponent implements OnInit {

  formProduct: any
  productId: any
  baseUrl = ''
  api = environment.apiUrl
  product: any = []
  url: string = "/product-detail";
  user?:string = undefined;

  constructor(private callApi: CallApiService, private fb: FormBuilder, public router: Router, 
    private acrout: ActivatedRoute,public cookie :CookieServiceService) {
    this.formProduct = fb.group({
      productName: [null],
      productPrice: [null],
      productDetail: [null]
    })

    acrout.queryParams.subscribe((res: any) => {
      this.productId = res.id | 0
    })
    this.user = cookie.getUserId();  
    console.log(this.user);
    
  }

  ngOnInit(): void {
    this.getProductById()
    this.getLinkShareProduct()
  }

  getProductById() {
    this.callApi.getProductById(this.productId).subscribe((res: any) => {
      this.product = res
      console.log(res);
    })
  }

  getLinkShareProduct() {
    this.baseUrl = window.location.port
      ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}${this.url}?id=${this.productId}&&affiliate=${this.user}`
      : `${window.location.protocol}//${window.location.hostname}${this.url}?id=?${this.productId}&&affiliate=${this.user}`;
  }

}
