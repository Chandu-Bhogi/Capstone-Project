import { Component, OnInit } from '@angular/core';

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
  showFunds = false
  showHome = true

  constructor() { }

  ngOnInit(): void {
  }

  logout_user() {
    alert("LogOut")
  }

  addToCart(item:String) {
    this.cart.push(item)
  }

  showCartBtn() {
    this.showHome = false
    this.showEdit = false
    this.showFunds = false
    this.showCart = true
  }

  showEditBtn() {
    this.showHome = false
    this.showCart = false
    this.showFunds = false
    this.showEdit = true
  }

  showFundBtn(){
    this.showHome = false
    this.showCart = false;
    this.showFunds = false
    this.showFunds = true;
    
  }

  homeBtn() {
    this.showCart = false
    this.showEdit = false
    this.showFunds = false
    this.showHome = true
  }

  removeFromCart(item:String) {
    let index = this.cart.indexOf(item)
    this.cart.splice(index, 1)
  }
}
