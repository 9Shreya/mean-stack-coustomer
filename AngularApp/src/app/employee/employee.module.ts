import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeRoutingModule} from './employee-routing.module';
import {EmployeeComponent} from './employee.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommonComponent } from './common/common.component';
import { CoustomerComponent } from './coustomer/coustomer.component';


@NgModule({
  declarations: [EmployeeComponent, LoginComponent, SignupComponent, CommonComponent, CoustomerComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,FormsModule
  ]
})
export class EmployeeModule {}
