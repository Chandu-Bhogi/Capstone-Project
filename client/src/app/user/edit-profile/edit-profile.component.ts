import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  password1Res?:string
  password2Res?:string 

  constructor(public user_service:UserService) { }

  ngOnInit(): void {
  }

  submitEdits(editProfileRef:any){
    // Grab the currently logged in username from sessionStorage
    let curr_userName:any = sessionStorage.getItem('userName')
    editProfileRef['userName'] = curr_userName
    
    let final_UserEdits:any = {}
    for(let [k,v] of Object.entries(editProfileRef)){
      if(v != ""){
        final_UserEdits[k] = v
      }
    }
    console.log(final_UserEdits)

    this.user_service.updateProfile(final_UserEdits)
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
