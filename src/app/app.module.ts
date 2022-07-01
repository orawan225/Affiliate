import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

// <---- Navbar --->
import { NavbarHeaderComponent } from './components/navbar/navbar-header/navbar-header.component';
import { NavbarFooterComponent } from './components/navbar/navbar-footer/navbar-footer.component';
import { NavbarLoginComponent } from './components/navbar/navbar-login/navbar-login.component';

// <---- Regisger --->
import { RegisterUserComponent } from './components/register/register-user/register-user.component';
import { RegisterCustomerComponent } from './components/register/register-customer/register-customer.component';
import { RegisterStoreComponent } from './components/register/register-store/register-store.component';

// <---- Logion --->
import { LoginComponent } from './components/login/login/login.component';
import { CheckLoginComponent } from './components/login/check-login/check-login.component';

// <---- Product --->
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProductStoreComponent } from './components/product/product-store/product-store.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { NavbarRegisterComponent } from './components/navbar/navbar-register/navbar-register.component';
import { NavbarStoreComponent } from './components/navbar/navbar-store/navbar-store.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarHeaderComponent,
    NavbarFooterComponent,
    NavbarLoginComponent,
    RegisterUserComponent,
    RegisterCustomerComponent,
    RegisterStoreComponent,
    LoginComponent,
    CheckLoginComponent,
    ProfileComponent,
    ProductDetailComponent,
    ProductStoreComponent,
    ProductCreateComponent,
    ProductEditComponent,
    NavbarRegisterComponent,
    NavbarStoreComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
    
    
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
