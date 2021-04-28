import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, Observer } from 'rxjs';
import { ServerResponse } from './model.serverResponse'
import { Product } from './model.product'
import { User } from './model.user'
import { Ticket } from './model.ticket'

@Injectable({
    providedIn: 'root'
  })

  export class ProductService{
    config:any = {
        URL:'http://localhost:',
        PORT:'4100'
    }
    
    constructor(public http:HttpClient) { }
      
    getProducts():Observable<Product> {
      let URL:string = this.config['URL']+this.config['PORT']+'/v1/products/getallproducts'
      console.log(`Traveling to: ${URL}`)
      return this.http.get<Product>(URL)
    }
  }