import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../seller.model';
import { ToastrService } from 'ngx-toastr';
import { faTrash, faFilePen } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{
  products !: Product[]
  deleteIcon=faTrash
  editIcon=faFilePen
  constructor(private productService:ProductService, private toastr:ToastrService){ }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.productService.displaySellProducts().subscribe((result)=>{
      console.log(result);
      this.products=result;
    })
  }

  deleteProduct(id:number){
    console.log("id  : "+id);
    this.productService.deleteSellProduct(id).subscribe((result)=>{
      if(result){
        this.list();
        this.toastr.success("Product deleted successfully..!!")
      }
    })
    
  }

}
