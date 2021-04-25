import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-unlock-users',
  templateUrl: './unlock-users.component.html',
  styleUrls: ['./unlock-users.component.css']
})
export class UnlockUsersComponent implements OnInit {

  constructor(public user_service:UserService) { }

  ngOnInit(): void {
  }

  unlockUsers(lockedUsersRef:any){
    console.log(lockedUsersRef)
  }

}
