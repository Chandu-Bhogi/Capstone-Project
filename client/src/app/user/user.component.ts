import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Product, Data } from '../model.product';
import { UserService } from '../user.service'
import { ShippedOrdersComponent } from '../employee/update-order-status/shipped-orders/shipped-orders.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  items:Data[] = []
  showCart = false
  showEdit = false
  cart:Array<Array<any>> = []
  currentUser:any = sessionStorage.getItem("userName")
  showFunds = false
  showHome = true
  showOrder = false
  totalQty=0;
  cartTotal=0;
  itemSelected = new Map()
  curr_funds: any;
  

  constructor(public router:Router, private locationStrategy: LocationStrategy, public userService:UserService) {
    this.preventBackButton()
    userService.getProducts().subscribe(result=> {
      this.items = result.data
      console.log(result.data);
      console.log(this.items);
    })
    let resp = this.userService.getUserByUsername(this.currentUser)
    resp.subscribe( (response:any) =>{
      let user_details = response['user'][0]
      console.log(user_details)
      this.curr_funds = user_details['funds']
    
   })}
   

  ngOnInit(): void {
  }

  preventBackButton() {
    history.pushState(null, "", location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, "", location.href);
    })
  }

  logout_user() {
    let logout:boolean = confirm("Are you sure you want to log out?")
    if(logout){
      sessionStorage.clear()
      this.router.navigate([''])      
    }
  }

  addToCart(item:string,itmPrice:Number) {
    console.log(itmPrice+"price item")
    if (this.itemSelected.has(item)) {
      this.itemSelected.set(item, [(this.itemSelected.get(item)[0] + 1),itmPrice.toPrecision(2)])
    } else {
      this.itemSelected.set(item, [1,itmPrice.toPrecision(2)])
    }
    this.cart = Array.from(this.itemSelected)
    this.cartTotalCal();
   
  }



  showCartBtn() {
    this.showCart = true
    this.showEdit = false
  }

  showEditBtn() {
    this.showHome = false
    this.showCart = false
    this.showFunds = false
    this.showEdit = true
    this.showOrder = false
  }

  showFundBtn(){
    this.showHome = false
    this.showCart = false;
    this.showEdit = false
    this.showFunds = true;
    this.showOrder = false
  }

  homeBtn() {
    this.showCart = false
    this.showEdit = false
    this.showFunds = false
    this.showHome = true
    this.showOrder = false
  }

  showOrderBtn() {
    this.showCart = false
    this.showEdit = false
    this.showFunds = false
    this.showHome = false
    this.showOrder = true
  }

  removeFromCart(item:Array<any>) {
    let index = this.cart.indexOf(item)
    this.cart.splice(index, 1)
    this.itemSelected.delete(item[0]);
    this.cartTotalCal();
  }

  updateFromCart(item:String,qty:string) {
    if (this.itemSelected.has(item)) {
      this.itemSelected.set(item,[parseInt(qty),this.itemSelected.get(item)[1]]);
    } 
    this.cart = Array.from(this.itemSelected)
    this.cartTotalCal();
  }

  cartTotalCal(){
   
    this.totalQty=0;
    this.cartTotal=0;
    for (let [key, value] of this.itemSelected) {
      this.totalQty+=value[0];
      
      var itemTotal=parseFloat((value[0]*value[1]).toPrecision(2));
      this.cartTotal+=itemTotal; 
  }
}

onKey(event: any) { 
  console.log("onkey"+event.target.value);
}



  

    buyOrder() {
      // alert(`You have bought ${this.cart.length} items`)
      // this.cart = []
      let resp = this.userService.getUserByUsername(this.currentUser)
    resp.subscribe( (response:any) =>{
      let user_details = response['user'][0]
      console.log(user_details)
      this.curr_funds = user_details['funds']
    
   })


      var cartOrders:any=[];
      cartOrders.customerId=this.currentUser;
      
        if(this.curr_funds<this.cartTotal){
          console.log("buyout");
          var msg=this.currentUser+"  have Insufficient Funds  $" + this.curr_funds+".Please add funds to your account";
          alert(msg);
          
        }else if(this.cartTotal<=0){
          alert("Please add items to the cart")
        }
        
        
        else{
          cartOrders.productCart=Array.from(this.itemSelected);
          cartOrders.cartTotal=this.cartTotal;
          cartOrders.orderedDate=new Date();
          cartOrders.status="In-process";
          JSON.stringify(cartOrders);
          this.curr_funds-=this.cartTotal;
          
          alert("order placed");
         
        }
  }
}
