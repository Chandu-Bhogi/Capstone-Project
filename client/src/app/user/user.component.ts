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
  cart:Array<Array<any>> = []
  currentUser = sessionStorage.getItem("userName")
  showFunds = false
  showHome = true
  showOrder = false

  itemSelected = new Map()

  constructor(public router:Router, private locationStrategy: LocationStrategy, public userService:UserService) {
    this.preventBackButton()
    userService.getProducts().subscribe(result=> {
      this.items = result.data
    })
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

  addToCart(item:String) {
    if (this.itemSelected.has(item)) {
      this.itemSelected.set(item, this.itemSelected.get(item) + 1)
    } else {
      this.itemSelected.set(item, 1)
    }
    this.cart = Array.from(this.itemSelected)
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
  }

  buyOrder() {
    // alert(`You have bought ${this.cart.length} items`)
    // this.cart = []
  }
}
