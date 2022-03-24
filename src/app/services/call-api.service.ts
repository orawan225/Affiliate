import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { user } from '../models/user';
import { product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  constructor(public http: HttpClient) { }

  //User
  public registerUser(data:any) {
    return this.http.post<user>(`${environment.apiUrl}user/user-register`, data)
  }

  public loginUser(data:any) {
    return this.http.post<user>(`${environment.apiUrl}user/user-login`, data)
  }


  //Customer
  public registerCustomer(data:any) {
    return this.http.post<user>(`${environment.apiUrl}customer/customer-register`, data)
  }

  public loginCustomer(data:any) {
    return this.http.post<user>(`${environment.apiUrl}un-security/customer-login`, data)
  }

  
  //Store
  public registerStore(data:any) {
    return this.http.post<user>(`${environment.apiUrl}store/store-register`, data)
  }

  public loginStore(data:any) {
    return this.http.post<user>(`${environment.apiUrl}store/store-login`, data)
  }
  

  //Product
  public createProduct(data:any) {
    return this.http.post<product>(`${environment.apiUrl}product/create-product`, data)
  }


  
}
