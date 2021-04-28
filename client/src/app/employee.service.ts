import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerResponse } from './model.serverResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  config:any = {
    URL:'http://localhost:',
    PORT:'4100'
  }

  constructor(public http:HttpClient) { }

  sendCredentials(employee:any):Observable<ServerResponse>{
    let URL = this.config["URL"]+this.config["PORT"]+"/v1/employees/login"
    console.log("[LOG]: Going to: " + URL)
    return this.http.post<ServerResponse>(URL,employee)
  }

  getEmployeeById(emp_info:any):Observable<ServerResponse>{
    let emp_id = emp_info['id']
    let URL:string = this.config['URL']+this.config['PORT']+'/v1/employees/getEmployeeById/'+emp_id
    console.log(`Traveling to: ${URL}`)
    return this.http.get<ServerResponse>(URL)
  }

  updatePassword(password_info:any):Observable<ServerResponse>{
    let emp_id = password_info['id']
    let URL:string = this.config['URL']+this.config['PORT']+'/v1/employees/updatepassword/'+emp_id
    console.log(`Traveling to: ${URL}`)
    return this.http.put<ServerResponse>(URL,password_info)
  }
}
