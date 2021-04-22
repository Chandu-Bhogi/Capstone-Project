import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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


}