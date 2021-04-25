import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/orders.service';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent implements OnInit {

  constructor(public orders_service:OrdersService) { }

  ngOnInit(): void {
  }

  submitOrderStatusUpdate(orderRef:any){
    console.log(orderRef)
  }

}
