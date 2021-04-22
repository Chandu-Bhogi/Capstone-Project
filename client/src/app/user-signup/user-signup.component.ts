import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  signUp = new FormGroup({
    fName:new FormControl(),
    lName:new FormControl(),
    email:new FormControl(),
    dod:new FormControl(),
    pNumber:new FormControl(),
    address:new FormControl(),
    password:new FormControl()
  })
  count = 1
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  signUpUser() {
    console.log(this.signUp.value)
    alert("Your Username is: "+this.userNameMaker(this.signUp.value.fName, this.signUp.value.lName, this.count))
    this.router.navigate(["user"])
  }

  userNameMaker(firstName:String, LastName:String, count:Number):String {
    return firstName.charAt(0).toLowerCase() + LastName.toLowerCase() + count
  }
}
