import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  items:String[] = ['item1', 'item2', 'item3', 'item4']
  cart:String[] = []
  checkCart = false

  constructor() { }

  ngOnInit(): void {
  }

  logout_user() {
    alert("LogOut")
  }

  addToCart(item:String) {
    this.cart.push(item)
  }

  showCart() {
    this.checkCart ? this.checkCart = false : this.checkCart = true
  }

  removeFromCart(item:String) {
    let index = this.cart.indexOf(item)
    this.cart.splice(index, 1)
  }
}
