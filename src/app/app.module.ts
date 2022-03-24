import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'


import { AppComponent } from './app.component';
import { LoginAffiliateComponent } from './components/affiliate/login-affiliate/login-affiliate.component';
import { RegisterAffiliateComponent } from './components/affiliate/register-affiliate/register-affiliate.component';
import { LoginCustomerComponent } from './components/customer/login-customer/login-customer.component';
import { RegisterCustomerComponent } from './components/customer/register-customer/register-customer.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarFooterComponent } from './components/navbar/navbar-footer/navbar-footer.component';
import { NavbarHeaderComponent } from './components/navbar/navbar-header/navbar-header.component';
import { LoginShopComponent } from './components/shop/login-shop/login-shop.component';
import { RegisterShopComponent } from './components/shop/register-shop/register-shop.component';
import { RegisterShopsComponent } from './components/shop/register-shops/register-shops.component';
import { RegisterComponent } from './components/shop/register/register.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { CartComponent } from './components/cart/cart.component';
import { AddressComponent } from './components/address/address.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ShareComponent } from './components/share/share.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginAffiliateComponent,
    LoginCustomerComponent,
    LoginShopComponent,
    RegisterAffiliateComponent,
    RegisterCustomerComponent,
    RegisterShopComponent,
    RegisterShopsComponent,
    HomeComponent,
    NavbarFooterComponent,
    NavbarHeaderComponent,
    RegisterComponent,
    CreateProductComponent,
    CartComponent,
    AddressComponent,
    PaymentComponent,
    ProductDetailComponent,
    ShareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
