import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { LocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';
import { Data } from '../model.order';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  count = 1
  reports:Data[] = []
  reportShow:Data[] = []

  showReport =  true
  showEdit = false
  showProduct = false

  constructor(private locationStrategy: LocationStrategy, public router: Router,public admin_service:AdminService, public userService:UserService) { 
    this.preventBackButton()
    userService.getAllOrders().subscribe(result => {
      console.log(result)
      this.reports = result.data
      this.reportShow = this.reports
    })
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
  
  customize(custom:any) {
    console.log(custom)
    if (custom.customerID != "" && custom.productID != "" && custom.customerID != null && custom.productID != null) {
      this.reportShow = []
      for(let i=0; i < this.reports.length; i++) {
        if(this.reports[i].id == custom.customerID) {
          this.reportShow.push(this.reports[i])
        }
      }
      let temp = this.reportShow
      this.reportShow = []
      for(let i=0; i < temp.length; i++) {
        for(let j=0; j < temp[i].cart.length; j++) {
          if(temp[i].cart[j].id == custom.productID) {
            this.reportShow.push(temp[i])
            break
          }
        }
      }
    } else {
      if (custom.customerID != "" && custom.customerID != null) {
        this.reportShow = []
        for(let i=0; i < this.reports.length; i++) {
          if(this.reports[i].id == custom.customerID) {
            this.reportShow.push(this.reports[i])
          }
        }
      }
  
      if (custom.productID != "" && custom.productID != null) {
        this.reportShow = []
        for(let i=0; i < this.reports.length; i++) {
          for(let j=0; j < this.reports[i].cart.length; j++) {
            if(this.reports[i].cart[j].id == custom.productID) {
              this.reportShow.push(this.reports[i])
              break
            }
          }
        }
      }
    }
  }

  resetTable() {
    this.reportShow = this.reports
  }

  daily() {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0');
    this.reportShow = []

    for(let i = 0; i < this.reports.length; i++) {
      if(dd == this.reports[i].date.split("/")[1]) {
        this.reportShow.push(this.reports[i])
      }
    }
  }

  weekly() {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    this.reportShow = []

    for(let i = 0; i < this.reports.length; i++) {
      if(dd == this.reports[i].date.split("/")[1] && mm == this.reports[i].date.split("/")[0]) {
        this.reportShow.push(this.reports[i])
      }
    }
  }

  monthly() {
    let today = new Date()
    let yyyy = String(today.getFullYear())
    this.reportShow = []

    for(let i = 0; i < this.reports.length; i++) {
      if(yyyy == this.reports[i].date.split("/")[2]) {
        this.reportShow.push(this.reports[i])
      }
    }
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
