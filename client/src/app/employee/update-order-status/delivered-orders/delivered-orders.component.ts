import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/orders.service';

@Component({
  selector: 'app-delivered-orders',
  templateUrl: './delivered-orders.component.html',
  styleUrls: ['./delivered-orders.component.css']
})
export class DeliveredOrdersComponent implements OnInit {

  constructor(public orders_service:OrdersService) { }

  ngOnInit(): void {
  }

  submitOrderStatusUpdate(orderRef:any){
    console.log(orderRef)
  }

}
