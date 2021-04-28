import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { ProductService } from 'src/app/product.service';
//import { Product, Data } from '../model.product';
//import {ProductService} from '../product.service'


@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.css']
})
export class SendRequestComponent implements OnInit {
  
  temp_products:any = {
    "products":[
      {id:1,pname:"apple",quantity:54},
      {id:2,pname:"orange",quantity:8},
      {id:3,pname:"grapes",quantity:19},
      {id:4,pname:"cherries",quantity:213},
      {id:5,pname:"peaches",quantity:182},
      {id:6,pname:"cocacola",quantity:562},
      {id:7,pname:"sprite",quantity:923},
      {id:8,pname:"mountaindew",quantity:231}
    
    ]
  }
  products:Data[] = []

  constructor(public router: Router, public product_service: ProductService) { 
    product_service.getProducts().subscribe((result: { data: any[]; })=> {
      this.products = result.data
    })
   }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  

  sendRequest2(productRef:any){
    console.log("TDF")
    console.log(productRef)
  }

  add_1(inputElementId:any){
    var product_input:any = document.getElementById(inputElementId)

    if(product_input.value == ''){
      product_input.value = "1"
    }
    else{
      let curr_quantity = parseInt(product_input.value,10)
      curr_quantity++
      product_input.value = curr_quantity
    }
    return product_input.value
  }

  sub_1(inputElementId:any){
    var product_input:any = document.getElementById(inputElementId)

    if(product_input.value == ''){
    }
    else{
      let curr_quantity = parseInt(product_input.value,10)
      curr_quantity--
      product_input.value = curr_quantity
    }
    return product_input.value
  }

}
