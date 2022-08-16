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


// <--- Material --->
import {MatDialogModule} from '@angular/material/dialog';



// <---- Navbar --->
import { NavbarHeaderComponent } from './components/navbar/navbar-header/navbar-header.component';
import { NavbarFooterComponent } from './components/navbar/navbar-footer/navbar-footer.component';
import { NavbarLoginComponent } from './components/navbar/navbar-login/navbar-login.component';
import { NavbarRegisterComponent } from './components/navbar/navbar-register/navbar-register.component';


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
import { ProductShareComponent } from './components/product/product-share/product-share.component';

// <---- Profile --->
import { ProfileUpdateComponent } from './components/profile/profile-update/profile-update.component';
import { ProfileUserComponent } from './components/profile/profile-user/profile-user.component';
import { ProfileStoreComponent } from './components/profile/profile-store/profile-store.component';
import { ProfileAffiliateComponent } from './components/profile/profile-affiliate/profile-affiliate.component';



import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';

import { OrderHistoryComponent } from './components/order/order-history/order-history.component';
import { OrderStoreComponent } from './components/order/order-store/order-store.component';
import { OrderProductComponent } from './components/order/order-product/order-product.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarHeaderComponent,
    NavbarFooterComponent,
    NavbarLoginComponent,
    NavbarRegisterComponent,
    RegisterUserComponent,
    RegisterCustomerComponent,
    RegisterStoreComponent,
    ProductDetailComponent,
    ProductStoreComponent,
    ProductCreateComponent,
    ProductEditComponent,
    CartComponent,
    PaymentComponent,
    LoginComponent,
    ProfileUpdateComponent,
    ProfileUserComponent,
    OrderHistoryComponent,
    OrderStoreComponent,
    ProfileStoreComponent,
    ProfileAffiliateComponent,
    ProductShareComponent,
    OrderProductComponent
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
    ShareIconsModule,
    MatDialogModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
