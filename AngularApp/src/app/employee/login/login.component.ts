import {SESSION_STORAGE} from './../../content';
import {Routes,Router} from '@angular/router';
import {ServiceService} from './../../service.service';
import {Component,OnInit} from '@angular/core';
declare var M;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service: ServiceService,private routes: Router) {}
  password;
  email;
  ngOnInit(): void {
  }
  loggin(login) {

    this.service.login(login.value).subscribe((response: any) => {
      console.log(response);
      if (response.status == 200) {
        localStorage.setItem('token',response.data);
        sessionStorage.setItem(SESSION_STORAGE.TOKEN,response.data);
        this.routes.navigate(['/coustomer-list']);
        M.toast({html: 'Login Succesfully',classes: 'rounded'})
        this.service.getUserPayload();

      }



    },(error) => {
      console.log(error);
      M.toast({html: error.message,classes: 'rounded'})

    })
  }
}
