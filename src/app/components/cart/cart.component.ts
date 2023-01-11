import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { store } from "./../../models/store";

import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {

  productList: any = [];
  allAmount: any = [];
  api = environment.apiUrl;
  productStores: Array<ProductASStore> = [];
  stores: Array<store> = [];


  constructor(
    public cartService: CartService, private callApiService: CallApiService, private router: Router) { }

  ngOnInit(): void {
    this.getDataOption()
  }


  getDataOption() {
    this.callApiService.getAllStore().subscribe((res) => {
      if (res) {
        this.stores = res;
        this.getProductId();
      }
    });
  }

  getCart(storeId: any) {
    this.router.navigate(['/order-product'])
    localStorage.setItem("storeId", JSON.stringify(storeId));
  }

  getProductId() {
    this.productList = this.cartService.getCart();
    this.productList.forEach((product: any) => {
      let findStore = this.productStores.find(x => x.storeId == product.storeId);

      if (findStore) {
        findStore.products.push(product);
      } else {
        const _productStore = new ProductASStore();
        _productStore.storeName = this.stores.find(x => x.storeId == product.storeId) != null
          ? this.stores.find(x => x.storeId == product.storeId)?.store!
          : '';
        _productStore.storeId = product.storeId;
        _productStore.products.push(product);

        this.productStores.push(_productStore);
      }
    });
    console.log(this.productStores);
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


  onAmountPlus(productId: number) {
    for (let index in this.productList) {
      if (this.productList[index].productId == productId) {
        this.productList[index].amount++;
        this.cartService.addCart(this.productList[index], false)
        break;
      }
    }
  }

  onAmountMinus(productId: number) {
    for (let index in this.productList) {
      if (this.productList[index].productId == productId) {

        if (this.productList[index].amount > 1) {
          this.productList[index].amount--;
          this.cartService.addCart(this.productList[index], false);
          break;
        }
      }
    }
  }

  onRemove(indexStore: number, indexItem: number) {
    var productId = this.productStores[indexStore].products[indexItem].productId;
    this.cartService.remove(productId);
    this.productStores[indexStore].products.splice(indexItem, 1);
    this.getDataOption()
  }

}



class ProductASStore {
  storeName: string = '';
  storeId: number = 0;
  products: Array<any> = [];
}