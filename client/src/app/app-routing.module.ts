import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"userPortal",component:UserComponent},
  {path:"editProfile",component:EditProfileComponent},
  //{path:'/',redirectTo:"/",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
