import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '../seller.model';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  switchmenu:string="defaultmenu";
  sellerName:string="";
  searchResult!:Product[];
  cartItems=0;
  userName:string="";
  headerSearch=faSearch;
  
  constructor(private route: Router,
    private product: ProductService){ }

  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem("seller") && val.url.includes("seller")){
          let sellerStore=localStorage.getItem("seller");
          let sellerData= sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName=sellerData.name;
          this.switchmenu="sellermenu";
        }
        else if(localStorage.getItem("user")){
          let userStore = localStorage.getItem("user");
          let userData= userStore && JSON.parse(userStore)[0];
          this.userName=userData.fname;
          this.switchmenu="usermenu";
          this.product.getCartList(userData.id);
        }
        else{
          this.switchmenu="defaultmenu"
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems=JSON.parse(cartData).length
    }
    
    this.product.cartData.subscribe((items)=>{
      this.cartItems=items.length
    })
  }
     
  logout(){
    localStorage.removeItem("seller");
    this.route.navigate(["/"]);
    this.product.cartData.emit([]);
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element= query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result)=>{
        this.searchResult=result;
      })
    }
  }

  hideSearch(){
    this.searchResult=[];
  }


  redirectToDetails(id:number){
    this.route.navigate(['/details/'+id])
  }

  submitSearch(val:string){
    this.route.navigate([`search/${val}`])
  }

  userlogout(){
    localStorage.removeItem("user");
    this.route.navigate(["/user-auth"]);
  }
}
