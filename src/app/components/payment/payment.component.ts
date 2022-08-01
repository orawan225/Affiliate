import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { CartService } from 'src/app/services/cart.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { ProfileUpdateComponent } from '../profile/profile-update/profile-update.component';

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
  formAddress: any
  profile: any = []
  user?: string = undefined;
  TotalAmount:any
  TotalPrice:any

  constructor(private fb: FormBuilder, public cartService: CartService, private callApi: CallApiService,
    private router: Router, private acrout: ActivatedRoute, private cookie: CookieServiceService,
    private dialog: MatDialog) {
    this.formPayment = fb.group({
      price: [null],
      day: [null],
      time: [null]
    })

    this.user = cookie.getUserId();
    console.log(this.user);

  }

  ngOnInit(): void {
    this.getProductByStoreId()
    this.getProfile()
  }

  getProfile() {
    this.callApi.getProfile().subscribe((res: any) => {
      this.profile = res.data.profile
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProfileUpdateComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getProductByStoreId() {
    let StoreId = localStorage.getItem("storeId");

    if (StoreId) {
      this.productList = this.cartService.getCart()

      // filter คือ การกรองข้อมูล ค้นหาสินค้าของ storeId นั้น ๆ  
      this.productList = this.productList.filter((element: any) =>element.storeId == StoreId);
      if(this.productList.length > 0){
        this.TotalAmount = this.cartService.getTotalAmount(StoreId)
        this.TotalPrice = this.cartService.getTotalPrice(StoreId)
      }
    }
  }



  createPayment() {
    const fileData = new FormData()
    fileData.append('file', this.file, this.file.name)
    fileData.append('order', JSON.stringify(this.formPayment.value))
    console.log(this.formPayment.value);
    this.callApi.createOrder(fileData).subscribe((res: any) => {
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
