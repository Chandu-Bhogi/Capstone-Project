import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  temp_users:any = {"users":[
    {id:1,name:"joe",locked:1},
    {id:2,name:"dan",locked:1},
    {id:3,name:"kevin",locked:0},
    {id:4,name:"eric",locked:1},
    {id:5,name:"mary",locked:0},
    {id:6,name:"randy",locked:1},
    {id:7,name:"andrea",locked:1},
    {id:8,name:"oliver",locked:1}
  ]}

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
