import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Seller, SellerLog } from '../seller.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SellerServiceService {
  isSellerLoggedIn= new BehaviorSubject<boolean>(false)
  isLoginError= new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private route: Router, private toastr: ToastrService) { }

  userSignUp(data:Seller){
    let result = this.http.post("http://localhost:3000/seller",
    data, {observe: 'response'}).subscribe((result) => {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result.body))
      this.route.navigate(['seller-home']);
     }); 
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.route.navigate(['seller-home']);
    }
  }

  sellerLogin(data:SellerLog){
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, 
    {observe:'response'}
    ).subscribe((result: any)=>{
      if(result && result.body && result.body.length){
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.toastr.success("Logged In Successfully...!!");
        this.route.navigate(['seller-home']);
      }else{
        this.isLoginError.emit(true);
      }
    })
  }
}
