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
    this.showCart ? this.showCart = false : this.showCart = true
    this.showEdit = false
  }

  showEditBtn() {
    this.showEdit ? this.showEdit = false : this.showEdit = true
    this.showCart = false
  }

  homeBtn() {
    this.showCart = false
    this.showEdit = false
  }

  removeFromCart(item:String) {
    let index = this.cart.indexOf(item)
    this.cart.splice(index, 1)
  }
}
