import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerResponse } from './model.serverResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  config:any = {
    URL:'http://localhost:',
    PORT:'4100'
  }

  constructor(public http:HttpClient) { }

  sendCredentials(admin:any):Observable<ServerResponse>{
    let URL = this.config["URL"]+this.config["PORT"]+"/v1/admin/login"
    console.log("[LOG]: Going to: " + URL)
    return this.http.post<ServerResponse>(URL,admin)
  }

  addEmployee(employee_details:any):Observable<ServerResponse>{
    let URL = this.config["URL"]+this.config["PORT"]+"/v1/employees/addemployee"
    console.log("[LOG]: Going to: " + URL)
    return this.http.post<ServerResponse>(URL,employee_details)
  }

  deleteEmployee(employee_details:any):Observable<ServerResponse>{
    let URL = this.config["URL"]+this.config["PORT"]+"/v1/employees/deleteemployee/"+employee_details
    console.log("[LOG]: Going to: " + URL)
    return this.http.delete<ServerResponse>(URL)
  }

  addProduct(product_info:any):Observable<ServerResponse>{
    let URL = this.config["URL"]+this.config["PORT"]+"/v1/products/addproduct/"
    console.log("[LOG]: Going to: " + URL)
    return this.http.post<ServerResponse>(URL,product_info)
  }

  updateProduct(product_info:any):Observable<ServerResponse>{
    let product_id = product_info['id']
    let URL = this.config["URL"]+this.config["PORT"]+`/v1/products/update/${product_id}`
    console.log("[LOG]: Going to: " + URL)
    return this.http.put<ServerResponse>(URL,product_info)
  }

  deleteProduct(product_info:any):Observable<ServerResponse>{
    let product_id = product_info['id']
    let URL = this.config["URL"]+this.config["PORT"]+`/v1/products/deleteproduct/${product_id}`
    console.log("[LOG]: Going to: " + URL)
    return this.http.delete<ServerResponse>(URL)
  }


}
