import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../seller.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  carouselProduct!:Product[];
  trendingProduct!:Product[];
  constructor(private productService:ProductService){ }

  ngOnInit(): void {
    this.productService.popularProducts().subscribe((data)=>{
      this.carouselProduct=data;
    })
    this.productService.trendingProducts().subscribe((data)=>{
      this.trendingProduct=data;
    })
  }
}
