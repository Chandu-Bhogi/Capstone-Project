import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  password1Res?:string
  password2Res?:string 

  constructor() { }

  ngOnInit(): void {
  }

  submitEdits(editProfileRef:any){
    console.log(editProfileRef)
  }

  submitNewPassword(updatePasswordRef:any){
    console.log(updatePasswordRef)

    // Check if current passoword matches

    // check if the new passwords match
    if(updatePasswordRef['f_newPassword1'] != updatePasswordRef['f_newPassword2']){
      this.password1Res = "❌ Password didn't match!"
      this.password2Res = "❌ Password didn't match!"
    }
  }

}
