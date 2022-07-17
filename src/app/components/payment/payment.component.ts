import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
      day: [null],
      time: [null]
    })
  }

  ngOnInit(): void {
    this.getProductAll()
  }

  getProductAll() {
    this.productList = this.cartService.getCart()
    console.log(this.productList); 
  }

  createPayment() {
    const fileData = new FormData()
    fileData.append('file', this.file, this.file.name)
    fileData.append('order', JSON.stringify(this.formPayment.value))
    console.log(this.formPayment.value);
    this.callApi.createPayment(fileData).subscribe((res: any) => {
      console.log(res);
    })
  }

  selectFile(event: any) {
    this.file = <File>event.target.files[0]
    const image = new FileReader();
    image.readAsDataURL(this.file)
    image.onload = () => {
      this.img = image.result
      console.log(this.img);
    }
  }


}
