import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './index/registration/registration.component';
import { LoginComponent } from './index/Login/login.component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './shared/main/main.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminEventComponent } from './home/admin-event/admin-event.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { MyEventComponent } from './home/my-event/my-event.component';
import { AttendeeComponent } from './home/attendee/attendee.component';

const routes: Routes = [
  {
    path:'', 
    component: IndexComponent,
    children:[
      {
        path:'', 
        component: MainComponent,
      },
      {
        path:'registration', 
        component: RegistrationComponent
      },
      {
        path: 'login', 
        component: LoginComponent
      }
    ]
  },
  {
    path:'home', 
    component: HomeComponent,
    children:[
      {
        path:'', 
        component: MainComponent
      },
      {
        path:'admin-event', 
        component: AdminEventComponent,
        canActivate:[AuthGuard],
        data: {permittedRoles: ['Admin']},
      },
      {
        path:'attendee',
        component:AttendeeComponent,
        canActivate:[AuthGuard],
        data: {permittedRoles: ['Admin']},
      },
      {
        path: 'my-event', 
        component: MyEventComponent
      }
    ]
  },
  
  {
    path:'forbidden',
    component:ForbiddenComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
