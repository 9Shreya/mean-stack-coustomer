import {SignupComponent} from './../signup/signup.component';
import {ServiceService} from './../../service.service';
import {Component,OnInit,ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
declare var M;
@Component({
  selector: 'app-coustomer',
  templateUrl: './coustomer.component.html',
  styleUrls: ['./coustomer.component.scss']
})
export class CoustomerComponent implements OnInit {

  constructor(private service: ServiceService,private route: Router) {}
  role;
  ngOnInit(): void {
    this.resetForm()
    this.getCoustomer();
    this.role = sessionStorage.getItem('role')
    this.mailId = sessionStorage.getItem('email')

    // if (this.role = 'coustomer') {
    //   this.filterConditionEmail(this.mailId)
    // }
  }
  mailId
  @ViewChild(SignupComponent) SignupComponent: SignupComponent;
  valcoustomer;
  intrestRate = "8%"
  coustomer = {
    '_id': '',
    'name': '',
    'email': '',
    'loan': '',
    'ammount': '',
    'status': 'New',
    'emi': '',
    'intrestRate': '8%',
    'duration': Number
  }
  ammount;
  duration;
  editStatus: boolean = false;
  coustomerSubmit(form: NgForm) {
    if (form.value._id == '') {
      form.value.status = 'new'
      form.value.intrestRate = '8%'
      form.value.emi = this.valcoustomer / 12

      this.service.postCoustomer(form.value).subscribe(
        (res) => {
          if (res.status == 200) {
            console.log(res);
            this.resetForm();
            this.getCoustomer();
            this.routeToLogin(res)
            this.valcoustomer = Number
            this.service.register({
              fullName: form.value.name,
              email: form.value.email,
              password: 123456
            }).subscribe((response: any) => {
              console.log(response);
            })
            this.duration = 0;
            this.ammount = Number;
            this.valcoustomer = 0
            M.toast({html: 'Saved Succesfully',classes: 'rounded'})
          }

        },
        (err) => {
          console.log(err);

        }
      )
    }
    else {
      this.changeValue()
      this.editStatus = false
      form.value.intrestRate = '8%'
      form.value.emi = this.valcoustomer / 12
      this.service.editCoustomer(form.value).subscribe(
        (res: any) => {
          if (res.status == 200) {
            console.log(res);
            this.resetForm();
            this.routeToLogin(res); this.getCoustomer()
            this.duration = 0;
            this.ammount = Number;
            this.valcoustomer = Number
            M.toast({html: 'Updated Succesfully',classes: 'rounded'})
          }
        },
        (err) => {
          console.log(err);

        })
    }

  }
  resetForm(form?) {
    this.coustomer = {
      '_id': '',
      'email': '',
      'name': '',
      'loan': '',
      'ammount': '',
      'status': '',
      'emi': '',
      'intrestRate': '',
      'duration': Number
    }
  }
  coustomerArray = []
  getCoustomer() {
    this.service.getCoustomer().subscribe(
      (res: any) => {
        this.coustomerArray = res.result
        console.log(res,this.coustomerArray);
        this.routeToLogin(res)

      },
      (err) => {
        console.log(err);

      }
    )
  }
  deleteCoustomer(form) {
    this.service.deleteCoustomer(form).subscribe(
      (res: any) => {
        if (res.status == 200) {
          console.log(res);
          M.toast({html: res.result.name + ' got deleted',classes: 'rounded'})
          this.getCoustomer();
          this.routeToLogin(res)
        }
      },
      (err) => {
        console.log(err);


      }
    )
  }
  editCoustomer(emp) {
    this.coustomer = emp;
    this.ammount = this.coustomer.ammount;
    this.duration = this.coustomer.duration;
    this.editStatus = true
  }
  searchText = ''
  filterCondition(coustomer) {
    return coustomer.name.toLowerCase().indexOf(this.searchText.toLowerCase())
      // ||employee.position.toLowerCase().indexOf(this.searchText.toLowerCase())
      != -1;
  }
  filterConditionEmail(coustomer) {
    return coustomer.email.toLowerCase().indexOf(this.searchText.toLowerCase())
      // ||employee.position.toLowerCase().indexOf(this.searchText.toLowerCase())
      != -1;
  }
  routeToLogin(err) {
    if (err.message === 'No token provided.') {
      this.route.navigate(['/'])
    }
  }


  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }
  changeValue() {
    // this.valcoustomer = Math.pow(this.ammount(1 + 8 / 100),(this.duration.value / 12));
    let power = (this.duration / 12);
    let amount = (1 + (8 / 100));
    let final = this.ammount * Math.pow(amount,power);
    console.log(final);
    this.valcoustomer = final
    console.log(this.ammount * (1 + (8 / 100)),this.duration,Math.pow(7,3));
    // this.coustomer.ammount = this.ammount
    // this.coustomer.duration = this.duration
    this.coustomer.emi = `${this.valcoustomer / this.duration}`
    this.coustomer.intrestRate = '8%',
      this.coustomer.status = 'new'
    console.log(this.coustomer);

  }
  approve(form: NgForm,value) {
    if (value == 'rejected') {
      form.value.status = 'rejected'
      this.coustomerSubmit(form);

    }
    if (value == 'approved') {
      form.value.status = 'approved'
      this.coustomerSubmit(form)

    }
  }
}
