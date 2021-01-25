import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

import { AuthService, responseDataa } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent   {
  isLogIn = true ;
  
  isLoading = false ;
  error : string = null ;

  constructor( private authServ : AuthService , private router : Router) { }
  
  onSwitch(){
    this.isLogIn = !this.isLogIn ;
  }

  
  onSubmit(form : NgForm){
    if(!form.valid){
      return;

    }
    const email = form.value.mail;
    const password = form.value.password;
    this.isLoading = true ;
    let authObs : Observable<responseDataa>
    if(this.isLogIn){
      this.isLoading = true ;
      
      
      
      authObs = this.authServ.signIn(email , password);
     

    }else{
      authObs = this.authServ.signUp(email , password)

    }
    authObs.subscribe(res=>{
      this.isLoading = false ;
      this.router.navigate(['/recipes']);
      
      
      
      

    } , error =>{
      console.log(error);
      this.error = "Error Ocured : " + error.error.error.message ;
      this.isLoading = false ;
      
      
    })
  }
  cancel(){
    return this.error=null;
  }

}
