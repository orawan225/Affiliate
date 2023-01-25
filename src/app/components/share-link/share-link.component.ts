import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { link } from 'src/app/models/link';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-share-link',
  templateUrl: './share-link.component.html',
  styleUrls: ['./share-link.component.css']
})
export class ShareLinkComponent implements OnInit {

  productId: any
  linkProduct: any
  api = environment.apiUrl
  totalPrice: any
  totalAmount: any
  linkAmount: any
  links: any
  productName: any
  productPrice: any

  baseUrl = ''
  url: string = "/product-detail";

  constructor(private acrout: ActivatedRoute, private callApi: CallApiService) {

    acrout.queryParams.subscribe((res: any) => {
      this.productId = res.id
    })

  }

  ngOnInit(): void {
    this.getShareLink()
  }

  getShareLink() {
    this.callApi.getShareLinkSuccess(this.productId).subscribe((res: any) => {
      this.linkProduct = res
      this.links = res.links
      this.totalPrice = res.totalPrice
      this.totalAmount = res.totalAmount
      this.linkAmount = res.linkAmount
      this.productName = res.productName
      this.productPrice = res.productPrice

      this.linkProduct = res.links
      this.baseUrl = window.location.port
      ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}${this.url}?id=${this.productId}&link=${res.data.link}`
      : `${window.location.protocol}//${window.location.hostname}${this.url}?id=${this.productId}&link=${res.data.link}`;
      navigator.clipboard.writeText(this.baseUrl)
      console.log(this.linkProduct);
      
    })
  }
}
