import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-employee-profile',
  templateUrl: './edit-employee-profile.component.html',
  styleUrls: ['./edit-employee-profile.component.css']
})
export class EditEmployeeProfileComponent implements OnInit {

  password1Res?:string
  password2Res?:string

  constructor() { }

  ngOnInit(): void {
  }

  submitNewPassword(updatePasswordRef:any){
    console.log(updatePasswordRef)

    // Check if current passoword matches

    // check if the new passwords match
    if(updatePasswordRef['f_newPassword1'] != updatePasswordRef['f_newPassword2']){
      console.log("ok")
      this.password1Res = "❌ Password didn't match!"
      this.password2Res = "❌ Password didn't match!"
    }
  }

}
