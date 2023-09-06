import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Cart, Product } from '../seller.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData!: Product;
  productQuantity: number = 1;
  removeCart = false;
  cartData:Product|undefined;
  constructor(private activeRoute: ActivatedRoute, private product: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProductById(productId).subscribe((result) => {
      this.productData = result;

      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: Product) => productId == item.id.toString())
        if (items.length) {
          this.removeCart = true
        } else {
          this.removeCart = false
        }
      }
      let User = localStorage.getItem('user');

      if (User) {
        let userr = User && JSON.parse(User)
        let userId = userr[0].id
        this.product.getCartList(userId)
        this.product.cartData.subscribe((result) => {
          let item = result.filter((item: Product) => productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.removeCart = true
          }
        })
      }
    })
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === "plus") {
      this.productQuantity += 1
    } else if (this.productQuantity > 1 && val === "min") {
      this.productQuantity -= 1
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true
      } else {
        console.log("user is logge in");
        let User = localStorage.getItem('user');
        let userr = User && JSON.parse(User)
        let userId = userr[0].id
        console.log("userid " + userId);

        let cartData: Cart = {
          ...this.productData,
          productId: this.productData.id,
          userId
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.toastr.success("Product Added To The Cart...!!")
            this.product.getCartList(userId)
            this.removeCart = true
          }
        })
      }

    }
  }

  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId)

    } else {
      let User = localStorage.getItem('user');
      let userr = User && JSON.parse(User)
      let userId = userr[0].id
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{
        if(result){
          this.product.getCartList(userId);
        }
      })
      this.removeCart = false
      
    }
  }
}
