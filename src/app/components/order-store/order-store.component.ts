import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CallApiService } from 'src/app/services/call-api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order-store',
  templateUrl: './order-store.component.html',
  styleUrls: ['./order-store.component.css']
})
export class OrderStoreComponent implements OnInit {

  formOrder: any
  productList: any = []
  file: any
  img: any = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'

  constructor(public cartService: CartService) {
   }

  ngOnInit(): void {
    this.getOrderAll()
  }

  getOrderAll() {
    this.productList = this.cartService.getCart()
    console.log(this.productList); 
  }

}
