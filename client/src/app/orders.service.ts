import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  // Temp arr of orders for testing purposes
  temp_order:any = {orders:[
    {tracking_id:1,recepient:"joe",status:"pending"},
    {tracking_id:2,recepient:"bob",status:"shipped"},
    {tracking_id:3,recepient:"fred",status:"pending"},
    {tracking_id:4,recepient:"ned",status:"pending"},
    {tracking_id:5,recepient:"cody",status:"shipped"},
    {tracking_id:6,recepient:"john",status:"delivered"},
    {tracking_id:7,recepient:"dave",status:"pending"}
  ]}

  constructor() { }
}
