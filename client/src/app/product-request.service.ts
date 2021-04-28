import { Injectable } from '@angular/core';
import { ServerResponse } from './model.serverResponse'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductRequestService {

  config:any = {
    URL:'http://localhost:',
    PORT:'4100'
  }

  constructor(public http:HttpClient) { }

  makeAddRequest(product_info:any):Observable<ServerResponse>{
    let URL:string = this.config['URL']+this.config['PORT']+'/v1/productrequest/addRequest'
    console.log(`Traveling to: ${URL}`)
    return this.http.post<ServerResponse>(URL,product_info)
  }

  makeDeleteRequest(product_info:any):Observable<ServerResponse>{
    let URL:string = this.config['URL']+this.config['PORT']+'/v1/productrequest/deleteRequest'
    console.log(`Traveling to: ${URL}`)
    return this.http.post<ServerResponse>(URL,product_info)
  }
}
