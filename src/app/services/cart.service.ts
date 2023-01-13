import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  key = "cart"

  cart: any[] = [];
  price: number = 0;
  constructor() { }

  addCart(product: any, add: boolean) {
    const cartLocal = localStorage.getItem(this.key);
    if (cartLocal) {
      this.cart = JSON.parse(cartLocal);
    } else {
      this.cart = [];
    }

    let added = false;
    this.cart.forEach((e: any, i: number) => {
      if (e.productId == product.productId) {
        if (add == true) {
          this.cart[i].amount++;
          this.cart[i].linkId = this.cart[i].linkId ? this.cart[i].linkId : product.linkId
        } else {
          this.cart[i].amount = product.amount;
        }
        added = true;
      }
    });

    if (!added) {
      product.amount = 1;
      product.totalPrice = product.productPrice * product.amount;
      this.cart.push(product);
    }
    localStorage.setItem(this.key, JSON.stringify(this.cart));
  }

  getCart() {
    let product = []
    let local = localStorage.getItem(this.key)
    if (local) {
      product = JSON.parse(local)
    }
    return product
  }



  getTotalPrice(storeId: any): number {
    let totalPrice: number = 0
    let product = this.getCart()
    product.forEach((e: any) => {
      if (storeId == e.storeId) {
        totalPrice += e.amount * e.productPrice
      }
    });
    return totalPrice
  }

  getTotalAmount(storeId: any): number {
    let totalAmount: number = 0
    let product = this.getCart()
    product.forEach((e: any) => {
      if (storeId == e.storeId) {
        totalAmount += e.amount
      }
    });
    return totalAmount
  }

  remove(productId: number) {
    let cart = this.getCart();

    //delete product in cart Localstorage by id
    for (let index in cart) {
      if (cart[index].productId == productId) {
        cart.splice(index, 1);
        break;
      }
    }

    localStorage.setItem(this.key, JSON.stringify(cart));
  }
}
