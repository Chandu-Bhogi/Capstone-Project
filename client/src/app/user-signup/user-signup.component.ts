import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service'
import { SignUp } from '../model.signup'

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  count = 1
  serverResult?:SignUp
  constructor(public router: Router, public userService:UserService) { }

  ngOnInit(): void {
  }

  signUpUser(userInfo:any) {
    console.log(userInfo)
    this.userService.signUpUser(userInfo).subscribe(result=>{
      console.log(result)
      if (result.status) {
        alert(result.message)
        sessionStorage.setItem("userName", result.userName)
        this.router.navigate(["user"])
      } else {
        alert(result.message)
      }
    });
  }
}
