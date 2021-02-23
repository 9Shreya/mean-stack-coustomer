import {BaseService} from './base.service';
import {environment} from './../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends BaseService {



  urll = environment.urll

  postEmployee(form) {
    return this.post(this.urll + 'employees',form)
  }
  getEmployee() {
    return this.get(this.urll + 'employees')
  }
  deleteEMployee(val) {
    return this.delete(this.urll + 'employees' + `/${val._id}`)
  }
  editEmployee(val) {
    return this.http.put(this.urll + 'employees' + `/${val._id}`,val)
  }
  login(val) {
    return this.post(this.urll + 'api/login',val)
  }
  register(val) {
    return this.http.post(this.urll + 'api/register',val)
  }
  // login(payload): Observable<any> {
  //   let headers = new Headers();
  //   headers.append("Content-Type","application/json");
  //   headers.append("Authorization","Bearer");
  //   return this.post(`${this.apiUrl}/backend/api/login`,payload,headers);
  // }
  deleteToken() {
    localStorage.removeItem('token');
  }
  getUserPayload() {
    var token = localStorage.getItem('token');
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      console.log(JSON.parse(userPayload));
      let valueToken = JSON.parse(userPayload);
      console.log(valueToken.email);
      sessionStorage.setItem("email",valueToken.email)


      if (valueToken.email == 'admin@gmail.com') {
        sessionStorage.setItem("role",'admin')
      }
      else if (valueToken.email == 'agent@gmail.com') {
        sessionStorage.setItem("role",'agent')
      }
      else {
        sessionStorage.setItem("role",'coustomer')
      }

      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  postCoustomer(form) {
    return this.post(this.urll + 'coustomer',form)
  }
  getCoustomer() {
    return this.get(this.urll + 'coustomer')
  }
  deleteCoustomer(val) {
    return this.delete(this.urll + 'coustomer' + `/${val._id}`)
  }
  editCoustomer(val) {
    return this.http.put(this.urll + 'coustomer' + `/${val._id}`,val)
  }
}
