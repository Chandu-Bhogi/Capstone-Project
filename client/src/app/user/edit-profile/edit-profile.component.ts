import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { User } from '../../model.user'

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
    console.log(editProfileRef)
  }

  submitNewPassword(updatePasswordRef:any){
    console.log(updatePasswordRef)

    let curr_userName:any = sessionStorage.getItem('userName')
    let resp = this.user_service.getUserByUsername(curr_userName)
    resp.subscribe( (response:any) =>{
      let user_details = response['user'][0]
      console.log(user_details)

      if(updatePasswordRef['f_newPassword1'] != updatePasswordRef['f_newPassword2']){
        this.password1Res = "❌ Password didn't match!"
        this.password2Res = "❌ Password didn't match!"
      }else{
        if(updatePasswordRef['f_currPassword'] == user_details['password']){
          console.log("Match!")
          // prep data to be changed
          let update_details = {
            userName:curr_userName,
            password:updatePasswordRef['f_newPassword1']
          }

          // Send PUT request for password change
          
        }
      }
    })
    
  }

}
