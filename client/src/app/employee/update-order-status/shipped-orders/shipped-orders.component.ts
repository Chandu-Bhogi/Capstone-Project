import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/orders.service';

@Component({
  selector: 'app-shipped-orders',
  templateUrl: './shipped-orders.component.html',
  styleUrls: ['./shipped-orders.component.css']
})
export class ShippedOrdersComponent implements OnInit {

  constructor(public orders_service:OrdersService) { }

  ngOnInit(): void {
  }

  submitOrderStatusUpdate(orderRef:any){
    console.log(orderRef)
  }

}
