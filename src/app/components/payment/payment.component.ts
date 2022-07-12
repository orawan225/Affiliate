import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  productList: any = []

  constructor( public cartService: CartService) { }

  ngOnInit(): void {
    this.getProductAll()
  }

  getProductAll() {
    this.productList = this.cartService.getCart()
    console.log(this.productList); 
  }

}
