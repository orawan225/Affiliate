import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { profile } from 'src/app/models/profile';
import { store } from 'src/app/models/store';
import { CallApiService } from 'src/app/services/call-api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  productList: any = []
  formPayment: any
  file: any
  img: any = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
  
  constructor(private fb: FormBuilder, public cartService: CartService, private callApi: CallApiService) {
    this.formPayment = fb.group({
      
    })
  }

  ngOnInit(): void {
    this.getProductAll()
    this.getProfile()
  }

  getProductAll() {
    this.productList = this.cartService.getCart()
    console.log(this.productList); 
  }

  getProfile() {
    this.callApi.getProfile().subscribe((res: any) => {
      console.log(res);
      
    })
  }

  selectFile(event: any) {
    this.file = <File>event.target.files[0]
    const image = new FileReader();
    image.readAsDataURL(this.file)
    image.onload = () => { this.img = image.result 
    console.log(this.img);
    }
  }

}
