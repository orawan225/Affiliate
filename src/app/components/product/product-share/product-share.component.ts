import { Clipboard } from '@angular/cdk/clipboard';
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
  linkProduct: any
  link: any


  constructor(private callApi: CallApiService, private fb: FormBuilder, public router: Router,
    private acrout: ActivatedRoute, public cookie: CookieServiceService, private clipboard: Clipboard) {
    this.formProduct = fb.group({
      productName: [null],
      productPrice: [null],
      productDetail: [null]
    })

    acrout.queryParams.subscribe((res: any) => {
      this.productId = res.id | 0
    })
  }

  ngOnInit(): void {
    this.getProductById()
  }

  getProductById() {
    this.callApi.getProductById(this.productId).subscribe((res: any) => {
      this.product = res
    })
  }


  getLinkShareProduct() {
    this.callApi.shareProduct(this.productId).subscribe((res: any) => {
      this.linkProduct = res.data.link

      let port = window.location.port ? ":" + window.location.port : "";

      this.baseUrl = `${window.location.protocol}//${window.location.hostname}${port}${this.url}?id=${this.productId}&link=${res.data.link}`

      this.clipboard.copy(this.baseUrl);

    })
  }

}
