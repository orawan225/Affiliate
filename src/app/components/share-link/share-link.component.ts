import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
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
  ordertList : boolean = false 
  api = environment.apiUrl
  totalPrice: any
  totalAmount: any
  linkAmount: any
  links: any
  productName: any
  productPrice: any

  hide: boolean = true

  constructor(private acrout: ActivatedRoute, private callApi: CallApiService, private alert: AlertService) {

    acrout.queryParams.subscribe((res: any) => {
      this.productId = res.id
    })

  }

  ngOnInit(): void {
    this.getShareLink()
  }

  getShareLink() {
    this.callApi.getShareLinkSuccess(this.productId).subscribe((res: any) => {
      this.linkProduct = res.data.detail.links
      this.links = res.data.detail
      this.totalPrice = res.data.detail.totalPrice
      this.totalAmount = res.data.detail.totalAmount
      this.linkAmount = res.data.detail.linkAmount
      this.productName = res.data.detail.productName
      this.productPrice = res.data.detail.productPrice
      this.ordertList = true
      console.log(this.links);
      
      console.log(this.linkProduct);
      
    
    },((err: any) => {
      if (err.status === 417) {
        this.hide = false
        this.ordertList = false
        console.log(this.ordertList);
      }
    }))
  }
}
