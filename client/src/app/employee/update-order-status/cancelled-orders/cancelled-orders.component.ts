import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/orders.service';

@Component({
  selector: 'app-cancelled-orders',
  templateUrl: './cancelled-orders.component.html',
  styleUrls: ['./cancelled-orders.component.css']
})
export class CancelledOrdersComponent implements OnInit {

  constructor(public orders_service:OrdersService) { }

  ngOnInit(): void {
  }

  submitOrderStatusUpdate(orderRef:any){
    console.log(orderRef)
  }

}
