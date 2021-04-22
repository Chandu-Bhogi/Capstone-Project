import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  employee = new FormGroup ({
    fName: new FormControl(),
    lName: new FormControl(),
    email: new FormControl()
  })

  employeeID = new FormGroup({
    id:new FormControl()
  })

  count = 1

  constructor() { }

  ngOnInit(): void {
  }

  addEmployee() {
    console.log(this.employee.value)
    alert(this.makeEmployeeID(this.employee.value.fName, this.employee.value.lName, this.count) + "\n" +
    this.makePassword(this.employee.value.email))
  }

  deleteEmployee() {
    console.log(this.employeeID.value)
  }

  makePassword(email:String):String {
    let min = Math.ceil(100)
    let max = Math.floor(1000)
    let num = Math.floor(Math.random() * (max - min) + min)

    return email.split("@")[0] + "" + num
  }

  makeEmployeeID(fName:String, lName:String, count:Number):String {
    return fName.charAt(0).toLowerCase() + lName.toLowerCase() + count
  }
}
