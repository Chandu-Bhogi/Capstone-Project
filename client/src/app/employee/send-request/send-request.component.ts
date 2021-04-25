import { Component, OnInit, } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.css']
})
export class SendRequestComponent implements OnInit {
  
  show:boolean = false
  temp_products:any = {
    "products":[
      {pname:"apple",quantity:54},
      {pname:"orange",quantity:8},
      {pname:"grapes",quantity:19},
      {pname:"cherries",quantity:213},
      {pname:"peaches",quantity:182},
      {pname:"cocacola",quantity:562},
      {pname:"sprite",quantity:923},
      {pname:"mountaindew",quantity:231}
    
    ]
  }
  products:Array<any> = []

  productQuantityForm?:any

  constructor() { }

  ngOnInit(): void {

    this.productQuantityForm = new FormGroup({
      product: new FormGroup({
        name:new FormControl(),
        quantity:new FormControl()
      })
    })
  }

  sendRequest(){
    console.log(this.productQuantityForm.value)
  }

  sendRequest2(productRef:any){
    console.log("TDF")
    console.log(productRef)

  }
}
