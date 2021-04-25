import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = new FormGroup({
    id:new FormControl(),
    password:new FormControl()
  })
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    this.router.navigate(["signup"])
  }

  report() {
    
  }

  signiInUser() {
    console.log(this.login.value)
    this.router.navigate(["user"])
  }

  signiInEmployee() {
    console.log(this.login.value)
    this.router.navigate(["employee"])

  }

  signiInAdmin() {
    console.log(this.login.value)
    this.router.navigate(["admin"])
  }
}
