import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { user } from '../models/user';
import { product } from '../models/product';
import { customer } from '../models/customer';
import { store } from '../models/store';
import { Observable } from 'rxjs';
import { CookieServiceService } from './cookie-service.service';
import { profile } from '../models/profile';


@Injectable({
  providedIn: 'root'
})
export class CallApiService {
  [x: string]: any;

  constructor(public http: HttpClient, private cookie: CookieServiceService) { }


  public header() {
    let token = this.cookie.getToken()
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  //User
  public registerUser(data: user) {
    return this.http.post<user>(`${environment.apiUrl}user/user-register`,data)
  }

  public loginUser(data: any) {
    return this.http.post<user>(`${environment.apiUrl}user/user-login`,data)
  }

  public getProfile(): Observable<profile> {
    return this.http.get<profile>(`${environment.apiUrl}user/getProfile`,this.header())
  }



  //Customer
  public registerCustomer(data: customer) {
    return this.http.post<customer>(`${environment.apiUrl}customer/customer-register`,data,this.header())
  }


  //Store
  public registerStore(data: store) {
    return this.http.post<store>(`${environment.apiUrl}store/store-register`,data,this.header())
  }


  
  //Product
  public getAllProduct(){
    return this.http.get<product>(`${environment.apiUrl}product/getAll-product`)
  }

  public getAllProductByStore(){
    return this.http.get<store>(`${environment.apiUrl}product/getAll-productByStoreId`,this.header())
  }
  public getProductById(productId: any) {
    return this.http.get<product>(`${environment.apiUrl}product/getProductById/${productId}`,this.header())
  }

  public editProductById(productId: string, product: product) {
    return this.http.put<product>(`${environment.apiUrl}product/update-product/${productId}`, product)
  }

  public createProduct(product: product) {
    return this.http.post<product>(`${environment.apiUrl}product/create-product`,product,this.header())
  }

 
}
