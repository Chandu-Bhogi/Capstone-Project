import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { LocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';

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

  constructor(private locationStrategy: LocationStrategy, public router: Router,public admin_service:AdminService, public userService:UserService) { 
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
    if (confirm("Are you sure you want to log out?")) {
      this.router.navigate([""])
    }
  }

  addEmployee(employee:any) {
    if (this.userService.regexp.test(employee.email)) {
      this.admin_service.addEmployee(employee)
      .subscribe(res=>{
        if (res.status) {
          alert(res.message)
        } else {
          alert(res.message)
        }
      })
    } else {
      alert("Invalid email")
    }
  }

  deleteEmployee(employeeID:any) {
    this.admin_service.deleteEmployee(employeeID.id)
    .subscribe(res=> {
      if (res.status) {
        alert(res.message)
      } else {
        alert(res.message)
      }
    })
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
    this.admin_service.updateProduct(product)
    .subscribe((res:any)=>{
      console.log(res)
      if(res.status){
        alert("Product has been updated")
      }else{
        alert("Issue with updating product")
      }
    })
  }

  deleteProduct(product:any) {
    console.log(product)
    this.admin_service.deleteProduct(product)
    .subscribe((res:any)=>{
      console.log(res)
      if(res.status){
        alert("Product has been deleted")
      }else{
        alert("Issue with deleting product")
      }
    })
  }

  addProduct(product:any) {
    console.log(product)
    this.admin_service.addProduct(product)
    .subscribe(res=>{
      console.log(res)
      if(res.status){
        alert("Product has been added")
      }else{
        alert("Product already exists!")
      }
    })
  }
}
