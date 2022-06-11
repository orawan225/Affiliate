import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { user } from '../models/user';
import { product } from '../models/product';
import { customer } from '../models/customer';
import { store } from '../models/store';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CallApiService { 

  constructor(public http: HttpClient) { }

  //User
  public registerUser(data: user) {
    return this.http.post<user>(`${environment.apiUrl}user/user-register`, data)
  }

  public loginUser(data: any) {
    return this.http.post<user>(`${environment.apiUrl}user/user-login`, data)
  }


  //Customer
  public registerCustomer(data: customer) {
    return this.http.post<customer>(`${environment.apiUrl}customer/customer-register`, data)
  }

  public loginCustomer(data: any) {
    return this.http.post<customer>(`${environment.apiUrl}customer/customer-login`, data)
  }


  //Store
  public registerStore(data: store) {
    return this.http.post<store>(`${environment.apiUrl}store/store-register`, data)
  }

  public loginStore(data: any) {
    return this.http.post<store>(`${environment.apiUrl}store/store-login`, data)
  }


  //Product
  public createProduct(data: any) {
    return this.http.post<product>(`${environment.apiUrl}product/create-product`, data)
  }

  getAllProduct(): Observable<product[]> {
    return this.http.get<product[]>(`${environment.apiUrl}product/getAll-product`);
  }




}
