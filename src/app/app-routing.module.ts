import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { CheckLoginComponent } from './components/login/check-login/check-login.component';
import { LoginComponent } from './components/login/login/login.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { ProductStoreComponent } from './components/product/product-store/product-store.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterCustomerComponent } from './components/register/register-customer/register-customer.component';
import { RegisterStoreComponent } from './components/register/register-store/register-store.component';
import { RegisterUserComponent } from './components/register/register-user/register-user.component';
import { ShareComponent } from './components/share/share.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'register-user', component: RegisterUserComponent},
  { path: 'register-customer', component: RegisterCustomerComponent},
  { path: 'register-store', component: RegisterStoreComponent},
  { path: 'login', component: LoginComponent},
  { path: 'check-login', component: CheckLoginComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'product-detail', component: ProductDetailComponent},
  { path: 'product-store', component: ProductStoreComponent},
  { path: 'product-create', component: ProductCreateComponent},
  { path: 'product-edit', component: ProductEditComponent},
  { path: 'cart', component: CartComponent},
  { path: 'share', component: ShareComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
