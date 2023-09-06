import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '../seller.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit{

  productData!:Product
  constructor(private route:ActivatedRoute,
    private productService:ProductService,
    private router:Router,
    private toastr:ToastrService){ }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get("id");
    productId && this.productService.getProductById(productId).subscribe((data)=>{
      this.productData=data;
    })
  }

  updateProduct(data:Product){
    if(this.productData){
      data.id=this.productData.id;
    }
    this.productService.updateProduct(data).subscribe((result)=>{
      if(result){
        this.router.navigate(['seller-home']);
        setTimeout(()=>{
          this.toastr.success("Updated Successfully..!!");}, 1000);
        
      }
    })
  }
}
