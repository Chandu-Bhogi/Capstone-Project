import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse } from './model.serverResponse'

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
    PORT:'4100'
  }

  constructor(public http:HttpClient) { }

  send_logout_request(){
    
  }

  get_userData(){
    let URL:string = this.config['URL']+this.config['PORT']+'/v1/profile/updateuser'
    return this.http.get(URL)
  }

  post_UpdateProfile(profileUpdates:any){
    let URL:string = this.config['URL']+this.config['PORT']+'/v1/profile/updateuser'
    console.log(`Traveling to: ${URL}`)
    return this.http.post(URL,profileUpdates).subscribe(response=>console.log(response),err=>console.log(err));
  }

  signUpUser(user:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>("http://localhost:4100/v1/auth/signup",user)
  }

  signInUser(user:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>("http://localhost:4100/v1/auth/login",user)
  }

}
