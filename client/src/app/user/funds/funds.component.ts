import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  addFunds(fundsAmnt:any){
    console.log("Here are the inputted funds:")
    console.log(fundsAmnt)
  }

}
