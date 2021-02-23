import {CoustomerComponent} from './coustomer/coustomer.component';
import {SignupComponent} from './signup/signup.component';
import {CommonComponent} from './common/common.component';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import {EmployeeComponent} from './employee.component';
import {AuthGuard} from 'authGaurd/auth.guard';

const routes: Routes = [
  {
    path: '',component: CommonComponent,
    children: [
      {
        path: 'login',component: LoginComponent
      },{
        path: 'signup',component: SignupComponent
      }
    ]
  },

  {
    path: 'employee',component: EmployeeComponent,canActivate: [AuthGuard]
  },
  {
    path: 'coustomer-list',component: CoustomerComponent,canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
