import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  amount: number = 1

  constructor() { }

  ngOnInit(): void {
  }

  
  onAmountPlus() {
    this.amount = this.amount + 1
  }

  onAmountMinus() {
    this.amount = this.amount - 1
    if (this.amount < 1) {
      this.amount = 1
    }
  }

}
