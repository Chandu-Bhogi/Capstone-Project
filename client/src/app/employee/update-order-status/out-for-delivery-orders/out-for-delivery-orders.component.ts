import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/orders.service';

@Component({
  selector: 'app-out-for-delivery-orders',
  templateUrl: './out-for-delivery-orders.component.html',
  styleUrls: ['./out-for-delivery-orders.component.css']
})
export class OutForDeliveryOrdersComponent implements OnInit {

  constructor(public orders_service:OrdersService) { }

  ngOnInit(): void {
  }

  submitOrderStatusUpdate(orderRef:any){
    console.log(orderRef)
  }

}
