import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { LocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  count = 1
  reports:String[] = ['Report1', 'Report2', 'Report3', 'Report4']
  report:String = ""

  showReport =  true
  showEdit = false
  showProduct = false

  constructor(private locationStrategy: LocationStrategy, public router: Router,public admin_service:AdminService) { 
    this.preventBackButton()
  }

  ngOnInit(): void {
  }

  preventBackButton() {
    history.pushState(null, "", location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, "", location.href);
    })
  }

  logOut() {
    this.router.navigate([""])
  }

  addEmployee(employee:any) {
    console.log(employee)
    alert(this.makeEmployeeID(employee.fName, employee.lName, this.count) + "\n" +
    this.makePassword(employee.email))

    this.admin_service.addEmployee(employee)
    .subscribe(res=>{
      console.log(res)
    })
  }

  deleteEmployee(employeeID:any) {
    console.log(employeeID)
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

  showReportBtn() {
    this.showReport = true
    this.showEdit = false
    this.showProduct = false
  }

  showEditBtn() {
    this.showReport = false
    this.showEdit = true
    this.showProduct = false
  }

  showProducts() {
    this.showReport = false
    this.showEdit = false
    this.showProduct = true
  }

  editProduct(product:any) {
    console.log(product)
  }

  deleteProduct(product:any) {
    console.log(product)
  }

  addProduct(product:any) {
    console.log(product)
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
