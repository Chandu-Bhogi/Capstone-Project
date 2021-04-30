import { Injectable } from '@angular/core';
import { ServerResponse } from './model.serverResponse'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductRequestService {

  config:any = {
    deployed:false,
    URL:'http://localhost:',
    PORT:'4100',
    URL2:'/api'
  }

  constructor(public http:HttpClient) { }

  makeAddRequest(product_info:any):Observable<ServerResponse>{
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/productrequest/addRequest'
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/productrequest/addRequest'
    }
    console.log(`Traveling to: ${URL}`)
    return this.http.post<ServerResponse>(URL,product_info)
  }

  makeDeleteRequest(product_info:any):Observable<ServerResponse>{
    let URL:string
    if(this.config['deployed']){
      URL = this.config['URL2']+'/v1/productrequest/deleteRequest'
    }else{
      URL = this.config['URL']+this.config['PORT']+'/v1/productrequest/deleteRequest'
    }
    console.log(`Traveling to: ${URL}`)
    return this.http.post<ServerResponse>(URL,product_info)
  }
}
