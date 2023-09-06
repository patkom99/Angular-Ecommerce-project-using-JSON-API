import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart, Product } from '../seller.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData=new EventEmitter<Product[] | []>();
  constructor(private http:HttpClient) { }

  addSellProducts(data:Product){
    return this.http.post("http://localhost:3000/products",data) 
  }

  displaySellProducts(){
    return this.http.get<Product[]>("http://localhost:3000/products");
  }
 
  deleteSellProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProductById(id:string){
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product:Product){
    return this.http.put(`http://localhost:3000/products/${product.id}`,product);
  }

  popularProducts(){
    return this.http.get<Product[]>("http://localhost:3000/products?_limit=5");
  }

  trendingProducts(){
    return this.http.get<Product[]>("http://localhost:3000/products?_limit=12");
  }

  searchProduct(query:string){
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddToCart(data:Product){
    let cartData=[]
    let localCart=localStorage.getItem('localCart')
    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    }else{
      cartData=JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId:number){
    let cartData=localStorage.getItem('localCart')
    if(cartData){
      let items:Product[]=JSON.parse(cartData);
      items=items.filter((item:Product)=>productId!==item.id)
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData:Cart){
    return this.http.post("http://localhost:3000/cart",cartData); 
  }

  getCartList(userId:number){
    return this.http.get<Product[]>("http://localhost:3000/cart?userId="+userId,
    {observe:'response'}).subscribe((result)=>{
      if(result && result.body){
        this.cartData.emit(result.body);

      }
    })
  }

  removeToCart(cartId:number){
    return this.http.delete("http://localhost:3000/cart/"+cartId); 
  }

  currentCart(){
    let User=localStorage.getItem('user');
    let userr=User && JSON.parse(User)
    let userId=userr[0].id
    
    return this.http.get<Cart[]>("http://localhost:3000/cart?userId="+userId);
  }
}
