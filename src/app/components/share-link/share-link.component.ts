import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { link } from 'src/app/models/link';
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
      this.linkProduct = res
      this.links = res.links
      this.totalPrice = res.totalPrice
      this.totalAmount = res.totalAmount
      this.linkAmount = res.linkAmount
      this.productName = res.productName
      this.productPrice = res.productPrice
      this.ordertList = true
      //console.log(this.linkProduct);
      //console.log(res);
    
    },((err: any) => {
      if (err.status === 417) {
        this.hide = false
        this.ordertList = false
        //console.log(this.ordertList);
      }
    }))
  }
}
