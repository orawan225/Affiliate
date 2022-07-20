import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { AppComponent } from './app.component';



// <---- Navbar --->
import { NavbarHeaderComponent } from './components/navbar/navbar-header/navbar-header.component';
import { NavbarFooterComponent } from './components/navbar/navbar-footer/navbar-footer.component';
import { NavbarLoginComponent } from './components/navbar/navbar-login/navbar-login.component';
import { NavbarRegisterComponent } from './components/navbar/navbar-register/navbar-register.component';
import { NavbarStoreComponent } from './components/navbar/navbar-store/navbar-store.component';

// <---- Regisger --->
import { RegisterUserComponent } from './components/register/register-user/register-user.component';
import { RegisterCustomerComponent } from './components/register/register-customer/register-customer.component';
import { RegisterStoreComponent } from './components/register/register-store/register-store.component';

// <---- Logion --->
import { LoginComponent } from './components/login/login.component';

// <---- Product --->
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProductStoreComponent } from './components/product/product-store/product-store.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';



import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShareComponent } from './components/share/share.component';
import { CartComponent } from './components/cart/cart.component';
import { AddressComponent } from './components/address/address.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderStoreComponent } from './components/order-store/order-store.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarHeaderComponent,
    NavbarFooterComponent,
    NavbarLoginComponent,
    NavbarRegisterComponent,
    NavbarStoreComponent,
    RegisterUserComponent,
    RegisterCustomerComponent,
    RegisterStoreComponent,
    ProfileComponent,
    ProductDetailComponent,
    ProductStoreComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ShareComponent,
    CartComponent,
    AddressComponent,
    PaymentComponent,
    LoginComponent,
    OrderStoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ShareButtonsModule,
    ShareIconsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
