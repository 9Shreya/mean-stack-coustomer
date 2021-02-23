import {NgForm} from '@angular/forms';
import {ServiceService} from './../service.service';
import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';
declare var M: any
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: ServiceService,private route: Router) {}
  role;
  ngOnInit(): void {
    this.resetForm()
    this.getEmployee();
    this.role = sessionStorage.getItem('role')
  }
  employee = {
    '_id': '',
    'name': '',
    'position': '',
    'office': '',
    'salary': ''
  }
  employeeSubmit(form) {
    if (form.value._id == '') {
      this.service.postEmployee(form.value).subscribe(
        (res) => {
          console.log(res);
          this.resetForm();
          this.getEmployee();
          this.routeToLogin(res)

          M.toast({html: 'Saved Succesfully',classes: 'rounded'})
        },
        (err) => {
          console.log(err);

        }
      )
    }
    else {
      this.service.editEmployee(form.value).subscribe(
        (res) => {
          console.log(res);
          this.resetForm();
          this.routeToLogin(res)
          this.getEmployee()
        },
        (err) => {
          console.log(err);

        })
    }

  }
  resetForm(form?) {
    this.employee = {
      '_id': '',
      'name': "",
      'position': '',
      'office': '',
      'salary': ''
    }
  }
  employeesArray = []
  getEmployee() {
    this.service.getEmployee().subscribe(
      (res: any) => {
        this.employeesArray = res.result
        console.log(res,this.employeesArray);
        this.routeToLogin(res)

      },
      (err) => {
        console.log(err);

      }
    )
  }
  deletEmployee(form) {
    this.service.deleteEMployee(form).subscribe(
      (res: any) => {
        console.log(res);
        M.toast({html: res.result.name + ' got deleted',classes: 'rounded'})
        this.getEmployee();
        this.routeToLogin(res)

      },
      (err) => {
        console.log(err);


      }
    )
  }
  editEmployee(emp) {
    this.employee = emp;
  }
  searchText = ''
  filterCondition(employee) {
    return employee.name.toLowerCase().indexOf(this.searchText.toLowerCase())
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
}
