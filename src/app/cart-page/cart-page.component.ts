import { Component, OnInit } from '@angular/core';
import { Cart, PriceSummary } from '../seller.model';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{
  cartData:Cart[]|undefined;
  deleteIcon=faTrash
  priceSumary:PriceSummary={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
  }
  constructor(private product:ProductService, private router: Router){}

  ngOnInit(): void {
    this.loadDetails();
  }

  removeToCart(cartId:number | undefined){
    cartId && this.cartData && this.product.removeToCart(cartId).subscribe((result) => {
      this.loadDetails();
    })
  }


  loadDetails(){
    this.product.currentCart().subscribe((result)=>{
      this.cartData=result
      console.log("cart data"+result);
      console.log("cart data"+this.cartData);
      
      let price=0;
      result.forEach((item)=>{
        if(item.quantity){
          price=price+ (+item.price* + item.quantity);

        }
      });
      this.priceSumary.price=price
      this.priceSumary.discount=price/10
      this.priceSumary.tax=price/10;
      this.priceSumary.delivery=100;
      this.priceSumary.total=price+(price/10)+100-(price/10);
      if(!this.cartData.length){
        this.router.navigate(['/'])
      }
    });

  }
}
