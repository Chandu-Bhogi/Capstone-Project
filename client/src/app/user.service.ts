import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUp } from './model.signup'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  config:any = {
    URL:'http://localhost:',
    PORT:'8100'
  }

  constructor(public http:HttpClient) { }

  send_logout_request(){
    
  }

  post_UpdateProfile(profileUpdates:any){
    return this.http.post(
      this.config['URL']+this.config['PORT']+'/',
      profileUpdates
    )
  }

  signUpUser(user:any):Observable<SignUp>{
    return this.http.post<SignUp>("http://localhost:4100/v1/auth/signup",user)
  }

}
