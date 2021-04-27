import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userMap = new Map()
  attempts = 2
  constructor(public router: Router, public userService:UserService,public adminService:AdminService) {
    sessionStorage.clear()
   }

  ngOnInit(): void {
  }

  signUp() {
    this.router.navigate(["signup"])
  }

  raiseTicket() {
    
  }

  signiInUser(userInfo:any) {
    console.log(userInfo)
    this.userService.signInUser(userInfo).subscribe(result=>{
      console.log(result)
      if (result.status) {
        sessionStorage.setItem("userName", userInfo.userName)
        this.router.navigate(["user"])
      } else {
        if (result.message == "Password") {
          if (this.userMap.has(userInfo.userName)) {
            if (this.userMap.get(userInfo.userName) == 3) {
              alert("Your accout has been locked!")
            } else {
              this.userMap.set(userInfo.userName, this.userMap.get(userInfo.userName) + 1)
              this.attempts--
              alert(`Wrong password, ${this.attempts} attempt(s) left`)
            }
          } else {
            this.attempts = 2
            this.userMap.set(userInfo.userName, 1)
            alert(`Wrong password, ${this.attempts} attempt(s) left`)
          }
        } else {
          alert(result.message)
        }
      }
    });
  }

  signiInEmployee(employeeInfo:any) {
    console.log(employeeInfo)
    this.router.navigate(["employee"])
  }

  signiInAdmin(adminInfo:any) {
    console.log(adminInfo)
    this.adminService.sendCredentials(adminInfo).subscribe(result=>{
      console.log(result)
      if(result.status){
        this.router.navigate(["admin"])
      }else{
        alert(result.message)
      }
    })
  }
}
