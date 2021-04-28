import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, Observer } from 'rxjs';
import { ServerResponse } from './model.serverResponse'
import { Product } from './model.product'
import { User } from './model.user'
import { Ticket } from './model.ticket'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

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

  get_userData(){
    let URL:string = this.config['URL']+this.config['PORT']+'/v1/profile/updateuser'
    return this.http.get(URL)
  }

  updateProfile(profileUpdates:any){
    let URL:string = this.config['URL']+this.config['PORT']+'/v1/profile/updateuser'
    console.log(`Traveling to: ${URL}`)
    return this.http.put(URL,profileUpdates).subscribe(response=>console.log(response),err=>console.log(err));
  }

  updatePassword(password_info:any):Observable<ServerResponse>{
    let username = password_info['userName']
    let URL:string = this.config['URL']+this.config['PORT']+'/v1/profile/updatepassword/'+username
    console.log(`Traveling to: ${URL}`)
    return this.http.put<ServerResponse>(URL,password_info)
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

  createTicket(ticket:any):Observable<ServerResponse> {
    return this.http.post<ServerResponse>("http://localhost:4100/v1/tickets/createticket",ticket)
  }

  getTickets():Observable<Ticket> {
    return this.http.get<Ticket>("http://localhost:4100/v1/tickets/getalltickets")
  }

  deleteTicket(userName:any):Observable<ServerResponse> {
    return this.http.delete<ServerResponse>("http://localhost:4100/v1/tickets/deletetticket/"+userName)
  }
}
