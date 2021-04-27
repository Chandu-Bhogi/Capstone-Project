import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, Observer } from 'rxjs';
import { ServerResponse } from './model.serverResponse'
import { Product } from './model.product'
import { User } from './model.user'

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

  getUserByUsername(username:string):Observable<User>{
    let URL = this.config['URL']+this.config['PORT']+'/v1/profile/getUser/'+username;
    console.log("[LOG]: Traveling to: " + URL)
    return this.http.get<User>(URL)
  }

  send_logout_request(){
    
  }

  post_UpdateProfile(profileUpdates:any){
    return this.http.post(
      this.config['URL']+this.config['PORT']+'/',
      profileUpdates
    )
  }

  addFunds(fundAmount:any){
    let URL = this.config['URL']+this.config['PORT']+'/v1/profile/addFunds'
    console.log(`Going to: ${URL}`)
    return this.http.post(URL,fundAmount)
  }

  signUpUser(user:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>("http://localhost:4100/v1/auth/signup",user)
  }

  signInUser(user:any):Observable<ServerResponse>{
    return this.http.post<ServerResponse>("http://localhost:4100/v1/auth/login",user)
  }

  getProducts():Observable<Product> {
    return this.http.get<Product>("http://localhost:4100/v1/products/getallproducts")
  }
}
