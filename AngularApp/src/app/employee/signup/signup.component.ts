import {ServiceService} from './../../service.service';
import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';
declare var M;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private service: ServiceService,private routes: Router) {}

  ngOnInit(): void {
  }
  fullName;
  email;
  password;
  confirmPassword;
  loggin(login) {
    this.service.register(
      {
        fullName: login.value.fullName,
        email: login.value.email,
        password: login.value.password
      }).subscribe((response: any) => {
        console.log(response);
        //localStorage.setItem('token',response.data);
        // sessionStorage.setItem(SESSION_STORAGE.TOKEN,response.data);
        this.routes.navigate(['/login']);
        M.toast({html: 'SignUp Succesfully',classes: 'rounded'})

      },(error) => {
        console.log(error);

      })
  }
}
