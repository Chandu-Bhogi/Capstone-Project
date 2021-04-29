import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/orders.service';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent implements OnInit {

  defaultChecked?:string;

  orders?:any;

  constructor(public order_service:OrdersService) { }

  ngOnInit(): void {
    
    
    this.order_service.getOrderByStatus({status:"Pending"})
    .subscribe((res:any)=>{
      console.log("In subscribe")
      console.log(res)

      this.orders = res["order"]
    })    
  }

  submitOrderStatusUpdate(orderRef:any){
    console.log(orderRef)
    for(let [k,v] of Object.entries(orderRef)){
      orderRef['id'] = k
      orderRef['status'] = v
      break;
    }

    this.order_service.updateOrderStatus(orderRef)
    .subscribe((res:any)=>{
      console.log(res)
      if(res.status){
        alert("Updated the status of the order")
      }else{
        alert("Issue with updating the order status")
      }
    })
  }

}
