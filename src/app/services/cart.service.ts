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
    console.log(product);

    // เช็คสินค้าใน storage ว่ามีไหม ถ้ามีก็เอา cartLocal ไปเพิ่มลงในตัวแปร cart
    const cartLocal = localStorage.getItem(this.key);
    if (cartLocal) {
      this.cart = JSON.parse(cartLocal);
    } else {
      this.cart = [];
    }


    let added = false;
    this.cart.forEach((e: any, i: number) => {
      console.log(e.productId, product.productId);
      if (e.productId == product.productId) {
        if (add == true) {
          this.cart[i].amount++
        } else {
          this.cart[i].amount = product.amount
        }
        added = true;
        console.log(e);
        return
      }
    })
    console.log(this.cart);


    if (!added) {
      product.amount = 1;
      product.totalPrice = product.productPrice * product.amount;
      this.cart.push(product);
      console.log(this.cart);
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

  getTotalPrice(): number {
    let totalPrice: number = 0
    let product = this.getCart()
    product.forEach((e: any) => {
      totalPrice += e.amount*e.productPrice
    });
    return totalPrice
  }

  getTotalAmount(): number {
    let totalAmount: number = 0
    let product = this.getCart()
    product.forEach((e: any) => {
      totalAmount += e.amount
    });
    return totalAmount
  }
}
