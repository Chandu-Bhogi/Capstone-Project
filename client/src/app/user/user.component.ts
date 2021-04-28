import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Product, Data } from '../model.product';
import { UserService } from '../user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  items:Data[] = []
  showCart = false
  showEdit = false
  localCart:Array<Array<any>> = []
  cart:any[] = []
  currentUser = sessionStorage.getItem("userName")
  showFunds = false
  showHome = true
  showOrder = false
  totalQty=0;
  cartTotal=0;
  itemSelected = new Map()

  constructor(public router:Router, private locationStrategy: LocationStrategy, public userService:UserService) {
    this.preventBackButton()
    userService.getProducts().subscribe(result=> {
      this.items = result.data
      console.log(result.data);
      console.log(this.items);
    })
    if (this.currentUser != null) {
      userService.getUserByUsername(this.currentUser).subscribe(result => {
        console.log(result.user[0].cart)
        let cart = result.user[0].cart
        for(let i=0; i < cart.length; i++) {
          this.itemSelected.set(cart[i].id, [(cart[i].quantity),(cart[i].total/cart[i].quantity).toPrecision(2)])
        }
        this.localCart = Array.from(this.itemSelected)
      })
    }
   }

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

  addToCart(item:string,itmPrice:any) {
    if (this.itemSelected.has(item)) {
      this.itemSelected.set(item, [(this.itemSelected.get(item)[0] + 1),itmPrice.toPrecision(2)])
    } else {
      this.itemSelected.set(item, [1,itmPrice.toPrecision(2)])
    }
    this.localCart = Array.from(this.itemSelected)
    this.cartTotalCal();
    console.log("Hello")
    this.cart = []
    for(let i = 0; i < this.localCart.length; i++) {
      let obj = {
        id: this.localCart[i][0],
        quantity: this.localCart[i][1][0],
        total: itmPrice * this.localCart[i][1][0]
      }
      this.cart.push(obj)
    }
    let userCart = {
      userName: sessionStorage.getItem('userName'),
      cart: this.cart
    }

    this.userService.updateProfile(userCart)
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
    let index = this.localCart.indexOf(item)
    this.localCart.splice(index, 1)
    this.itemSelected.delete(item[0]);
    this.cartTotalCal();
  }

  updateFromCart(item:String,qty:string) {
    if (this.itemSelected.has(item)) {
      this.itemSelected.set(item,[parseInt(qty),this.itemSelected.get(item)[1]]);
    } 
    this.localCart = Array.from(this.itemSelected)
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

cartTotalAmount(){
this.itemSelected.forEach((item,val)=>
{
  console.log(item,val);
 
}
)

}

  buyOrder() {
    // alert(`You have bought ${this.cart.length} items`)
    // this.cart = []
    //var obj:any=[];
    //obj.customerId="";



  }
}
