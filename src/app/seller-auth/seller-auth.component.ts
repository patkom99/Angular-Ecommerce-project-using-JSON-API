import { Component, OnInit } from '@angular/core';
import { SellerServiceService } from '../service/seller-service.service';
import { Seller, SellerLog } from '../seller.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{

  constructor(private seller:SellerServiceService,
    private route:Router,
    private toastr: ToastrService,
    ) {}
    isSellerLogin=false
  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  signUp(data:Seller):void{
    this.seller.userSignUp(data) 
  }

  login(data:SellerLog):void{
    this.seller.sellerLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.toastr.error("Email or password is Invalid..");
      }else{
        this.toastr.success("Logged In Successfully...!!");
      }
    })
  }

  displayLogin(){
    this.isSellerLogin=false
  }
  displaySignup(){
    this.isSellerLogin=true
  }
}
