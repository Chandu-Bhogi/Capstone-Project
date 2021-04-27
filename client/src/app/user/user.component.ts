import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  items:String[] = ['item1', 'item2', 'item3', 'item4']
  cart:String[] = []
  showCart = false
  showEdit = false
  currentUser = sessionStorage.getItem("userName")
  showFunds = false
  showHome = true
  showOrder = false

  constructor(public router:Router, private locationStrategy: LocationStrategy) {
    this.preventBackButton()
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
    sessionStorage.clear()
    this.router.navigate([""])
  }

  addToCart(item:String) {
    this.cart.push(item)
  }

  showCartBtn() {
    this.showHome = false
    this.showEdit = false
    this.showFunds = false
    this.showCart = true
    this.showOrder = false
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

  removeFromCart(item:String) {
    let index = this.cart.indexOf(item)
    this.cart.splice(index, 1)
  }

  buyOrder() {
    alert(`You have bought ${this.cart.length} items`)
    this.cart = []
  }
}
