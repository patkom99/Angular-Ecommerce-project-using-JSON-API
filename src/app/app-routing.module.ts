import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { sellerGuard } from './seller.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';

const routes: Routes = [
  { 
    path: "", component: HomeComponent,
  },
 {
  path: "seller-auth", component:SellerAuthComponent,
 },
 {
  path: "seller-home", component:SellerHomeComponent, canActivate: [sellerGuard],
 },
 {
  path: "seller-add-product", component:SellerAddProductComponent, canActivate: [sellerGuard],
 },
 {
  path: "seller-update-product/:id", component:SellerUpdateProductComponent, canActivate: [sellerGuard],
 },
 {
  path: "search/:query", component:SearchComponent,
 },
 {
  path: "details/:productId", component:ProductDetailsComponent,
 },
 {
  path: "user-auth", component:UserAuthComponent,
 },
 {
  path: "cart-page", component:CartPageComponent,
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
