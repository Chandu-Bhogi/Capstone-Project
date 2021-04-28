import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { ProductRequestService } from 'src/app/product-request.service';
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

  constructor(public router: Router, public product_service: ProductService,public productRequest_service:ProductRequestService) { 
    product_service.getProducts().subscribe((result: { data: any[]; })=> {
      this.products = result.data
    })
   }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
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

  addProductRequest(productQuantityRef:any,product_id:any){
    console.log(productQuantityRef)
    console.log(product_id)

    let emp_id = sessionStorage.getItem('id')

    let pr_add_info = {
      id:product_id,
      emp_id:emp_id,
      quantity:productQuantityRef['quantity'],
      request_type:"add"
    }

    this.productRequest_service.makeAddRequest(pr_add_info)
    .subscribe((res)=>{
      if(res.status){
        alert("Product Request has been sent")
      }else{
        alert("Issue sending product request")
      }
    })
  }

  deleteProductRequest(productQuantityRef:any,product_id:any){
    console.log(productQuantityRef)
    console.log(product_id)

    let emp_id = sessionStorage.getItem('id')

    let pr_delete_info = {
      id:product_id,
      emp_id:emp_id,
      quantity:productQuantityRef['quantity'],
      request_type:"delete"
    }
    this.productRequest_service.makeDeleteRequest(pr_delete_info)
    .subscribe((res:any)=>{
      if(res.status){
        alert("Product Delete Request has been sent")
      }else{
        alert("Issue sending product delete request")
      }
    })
  }

}
