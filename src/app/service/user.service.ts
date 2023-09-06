import { EventEmitter, Injectable } from '@angular/core';
import { SellerLog, SignUp, UserLog } from '../seller.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isUserLoggedIn= new BehaviorSubject<boolean>(false)
  isLoginError= new EventEmitter<boolean>(false)

  constructor(private http:HttpClient, private router:Router, private toastr: ToastrService) { }
  userSignUp(user:SignUp){
    this.http.post("http://localhost:3000/users",user,{observe: 'response'})
    .subscribe((result)=>{
      if(result){
        this.isUserLoggedIn.next(true);
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(["/"])
      }
    })
  }

  userLogin(data:UserLog){
    this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.passw}`, 
    {observe:'response'})
    .subscribe((result:any)=>{
      if(result && result.body && result.body.length){
        this.isLoginError.emit(false);
        
        this.isUserLoggedIn.next(true);
        localStorage.setItem('user',JSON.stringify(result.body));
        this.toastr.success("Logged In Successfully...!!");
        this.router.navigate(["/"])
      }else{
        this.isLoginError.emit(true);
      }
    })
  }
 
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.isUserLoggedIn.next(true);
      this.router.navigate(['/'])
    }
  }
}
