import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse } from './model.serverResponse'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  config:any = {
    URL:'http://localhost:',
    PORT:'4100'
  }

  // Temp arr of orders for testing purposes
  temp_order:any = {orders:[
    {tracking_id:1,recepient:"gali1",status:"pending"},
    {tracking_id:2,recepient:"bob",status:"shipped"},
    {tracking_id:3,recepient:"fred",status:"pending"},
    {tracking_id:4,recepient:"ned",status:"pending"},
    {tracking_id:5,recepient:"gali1",status:"shipped"},
    {tracking_id:6,recepient:"john",status:"delivered"},
    {tracking_id:7,recepient:"dave",status:"pending"},

    {tracking_id:8,recepient:"gali1",status:"cancelled"},
    {tracking_id:9,recepient:"dan",status:"outForDelivery"},
    {tracking_id:10,recepient:"gali1",status:"cancelled"},
    {tracking_id:11,recepient:"gali1",status:"shipped"},
    {tracking_id:12,recepient:"kevin",status:"outForDelivery"}
  ]}

  constructor(public http:HttpClient) { }

  getUserOrders(user_details:any):Observable<ServerResponse>{
    let username = user_details['id']
    let URL:string = this.config['URL']+this.config['PORT']+'/v1/orders/getOrderByUser/'+username
    console.log(`Traveling to: ${URL}`)
    return this.http.get<ServerResponse>(URL)

  }
}
