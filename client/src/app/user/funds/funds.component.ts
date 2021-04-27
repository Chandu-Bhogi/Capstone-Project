import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {

  curr_funds?:Number;

  constructor(public user_service:UserService) { }

  ngOnInit(): void {
  }

  addFunds(fundsAmnt:any){
    console.log("Here are the inputted funds:")
    console.log(fundsAmnt)
  
    
    let curr_userName:any = sessionStorage.getItem('userName')
    let funds_info = {
      userName:curr_userName,
      funds:fundsAmnt
    }

    this.user_service.addFunds(funds_info)
    .subscribe((res:any)=>{
      //console.log(res)

      let user_details = res['user']
      console.log(user_details)
      this.curr_funds = user_details['funds']
    })
  }

}
