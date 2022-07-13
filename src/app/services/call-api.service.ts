import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { user } from '../models/user';
import { product } from '../models/product';
import { store } from '../models/store';
import { CookieServiceService } from './cookie-service.service';
import { profile } from '../models/profile';
import { affiliate } from '../models/affiliate';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CallApiService {
  cartDataList: any = []
  productList = new BehaviorSubject<any>([])

  constructor(public http: HttpClient, private cookie: CookieServiceService) {
   }

  public header() {
    let token = this.cookie.getToken()
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  //User
  public registerUser(data: any) {
    return this.http.post<user>(`${environment.apiUrl}/auth/user-register`, data)
  }

  public loginUser(data: any) {
    return this.http.post<user>(`${environment.apiUrl}/auth/user-login`, data)
  }


  //Profile

  public getProfile(){
    return this.http.get<profile>(`${environment.apiUrl}/user/getProfile`, this.header())
  }

  public editProfile() {
    return this.http.put<profile>(`${environment.apiUrl}/user/update-profile`, this.header())
  }



  //Affiliate
  public registerCustomer(data: any) {
    return this.http.post<affiliate>(`${environment.apiUrl}/affiliate/affiliate-register`, data, this.header())
  }


  //Store
  public registerStore(data: any) {
    return this.http.post<store>(`${environment.apiUrl}/store/store-register`, data, this.header())
  }

  public getAllStore(data: store) {
    return this.http.post<store>(`${environment.apiUrl}/store/getAll-store`, data, this.header())
  }



  //Product
  public getAllProduct() {
    return this.http.get<product>(`${environment.apiUrl}/auth/getAll-byStatusIsTrue-product`)
  }

  public getAllProductByStore() {
    return this.http.get<product>(`${environment.apiUrl}/product/getMy-productByStoreIsTrue`, this.header())
  }

  public getProductById(productId: any) {
    return this.http.get<product>(`${environment.apiUrl}/auth/getProductById/${productId}`)
  }

  public createProduct(product: any) {
    return this.http.post<product>(`${environment.apiUrl}/product/create-product`,product, this.header())
  }

  public editProductById(productId: string, product: any) {
    return this.http.put<product>(`${environment.apiUrl}/product/update-product/${productId}`, product, this.header())
  }

  public deleteProductById(productId: string, product: product) {
    return this.http.put<product>(`${environment.apiUrl}/product/update-productByStatus/${productId}`, product, this.header())
  }

}
