import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RpasswordComponent } from './pages/rpassword/rpassword.component';
import { AdmindashboardComponent } from './pages/admindashboard/admindashboard.component';
import { UserdashboardComponent } from './pages/userdashboard/userdashboard.component';
import { AdminhomeComponent } from './pages/adminhome/adminhome.component';
import { UserhomeComponent } from './pages/userhome/userhome.component';
import { AddtourComponent } from './pages/addtour/addtour.component';
import { EdittourComponent } from './pages/edittour/edittour.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { MybookingComponent } from './pages/mybooking/mybooking.component';
import { BooktourComponent } from './pages/booktour/booktour.component';
import { UserbookingComponent } from './pages/userbooking/userbooking.component';
import { WelcomepageComponent } from './pages/welcomepage/welcomepage.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomepageComponent,
  },
  {
    path: 'signIn',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'resetpassword',
    component: RpasswordComponent,
  },
  {
    path: 'admindashboard',
    component: AdmindashboardComponent,
    children: [
      {
        path: 'home',
        component: AdminhomeComponent,
      },
      {
        path: 'adminComment/:id',
        component: AddtourComponent,
      },
      {
        path: 'edittour/:id',
        component: EdittourComponent,
      },
      {
        path: 'userbooking',
        component: UserbookingComponent,
      },
    ],
  },
  {
    path: 'userdashboard',
    component: UserdashboardComponent,
    children: [
      {
        path: 'home',
        component: UserhomeComponent,
      },
      {
        path: 'addExperience',
        component: UserprofileComponent,
      },
      {
        path: 'comment/:id',
        component: MybookingComponent,
      },
      {
        path: 'addplace',
        component: BooktourComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
