import { Component, OnInit } from '@angular/core';
import { Cart, Product, SellerLog, SignUp, UserLog } from '../seller.model';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  constructor(private user: UserService,
    private route: Router,
    private toastr: ToastrService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  onSubmit(data: SignUp) {
    this.user.userSignUp(data);
  }

  login(data: UserLog){
    this.user.userLogin(data);
    this.user.isLoginError.subscribe((isError) => {
      if (isError) {
        this.toastr.error("Email or password is Invalid..");
      } else {
        setTimeout(()=>{
          this.localCartToRemoteCart();

        }, 300);
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignup() {
    this.showLogin = false;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart')
    let User=localStorage.getItem('user');
    let userr=User && JSON.parse(User)
    let userId=userr[0].id
    if (data) {
      let cartDataList: Product[] = JSON.parse(data);

      cartDataList.forEach((product: Product, index) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId
        }
        delete cartData.id;
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result) => {
            if (result) {

            }
          })
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }

        }, 500);
      });

    }


    setTimeout(() => {
      this.productService.getCartList(userId);
      
    }, 2000);
  }
}
