import { Component, OnInit } from '@angular/core';

import { product } from 'src/app/models/product';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  amount: number = 1


  productList: any = [];


  // productId:
  // amount:

  allAmount: any = [];


  constructor(private callApi: CallApiService, private cookie: CookieServiceService) { }

  ngOnInit(): void {
    this.getProductId()
  }

  getProductId() {
    let productId = localStorage.getItem('productId')
    console.log(productId);
    this.callApi.getProductById(productId).subscribe((res: any) => {

      console.log(res);
      // this.cookie.setProduct(res.data.product)


      this.productList = localStorage.getItem('productDetail');
      if (this.productList == null) {
        localStorage.setItem('productDetail', '[]');
      }
      else {
        this.productList = JSON.parse(this.productList);
        // check if array already have contain the res value
        const isFound = this.productList.some((element: any) => {
          if (element["productId"] == productId) {
            return true;
          }
          return false;
        });

        if (!isFound) {
          res['amount'] = 1;
          res['totalPrice'] = res['productPrice']*res['amount'];
          this.productList.push(res);

          // this.productList.foreach((item:any)=>{
          //   item['amount'] = 0;
          // });
        }



        //this.SetAllAmount();
        console.log(this.productList);
        localStorage.setItem('productDetail', JSON.stringify(this.productList));
      }

    })

  }



  SetAllAmount() {
    this.productList.map((item: any) => {
      this.allAmount.push(
        {
          productId: item.productId,
          amount: 0
        }
      )
    });
  }


  onAmountPlus(index: number) {
    //this.amount = this.amount + 1;
    this.productList[index].amount++;
    localStorage.setItem('productDetail', JSON.stringify(this.productList));
  }

  onAmountMinus(index: number) {
    //this.amount = this.amount - 1;
    if (this.productList[index].amount > 1) {
      this.productList[index].amount--;
      localStorage.setItem('productDetail', JSON.stringify(this.productList));
    }
  }


}