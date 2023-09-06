import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../seller.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

  constructor(private productService:ProductService,
    private toastr: ToastrService,
    private route: Router){ }

  addProduct(data:Product){
    console.log(data);
    this.productService.addSellProducts(data).subscribe((result)=>{
      console.log(result);
      if(result){
        this.toastr.success("Product Added Successfully")
        this.route.navigate(["seller-home"])
      }
    })
  }
}
