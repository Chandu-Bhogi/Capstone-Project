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

  custom = new FormGroup({
    productID:new FormControl(),
    customerID:new FormControl()
  })

  count = 1
  reports:String[] = ['Report1', 'Report2', 'Report3', 'Report4']
  report:String = ""

  showReport =  false
  showEdit = false
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

  selectReport(report:String) {
    console.log(report)
    this.report = report
  }


  customize(custom:any) {
    console.log(custom)
  }

  daily() {

  }

  weekly() {

  }

  monthly() {

  }

  resolve() {
    let index = this.reports.indexOf(this.report)
    this.reports.splice(index,1)
  }

  homeBtn() {
    this.showReport = false
    this.showEdit = false
  }

  showReportBtn() {
    this.showReport = true
    this.showEdit = false
  }

  showEditBtn() {
    this.showReport = false
    this.showEdit = true
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
