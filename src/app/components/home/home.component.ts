import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { product } from 'src/app/models/product';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formProduct: any
  products: product[] = []

  constructor(public callApi: CallApiService, public router: Router, public fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.callApi.getAllProduct().subscribe((data: product[]) => {
      this.products = data;
      console.log(data)
    })
  }




}
