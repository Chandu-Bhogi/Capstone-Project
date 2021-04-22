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
  constructor() { }

  ngOnInit(): void {
  }

  signUp() {

  }

  report() {
    
  }

  signiInUser() {

  }

  signiInEmployee() {

  }

  signiInAdmin() {

  }
}
