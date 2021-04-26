import { Component, OnInit } from '@angular/core';
import { Product, Data } from '../model.product';
import { UserService } from '../user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  items:Data[] = []
  cart:String[] = []
  showCart = false
  showEdit = false
  currentUser = sessionStorage.getItem("userName")
  showFunds = false
  showHome = true

  constructor(public userService:UserService) { 
    userService.getProducts().subscribe(result=> {
      this.items = result.data
    })
  }

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
    this.showEdit = false
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

  buyOrder() {
    alert(`You have bought ${this.cart.length} items`)
    this.cart = []
  }
}
