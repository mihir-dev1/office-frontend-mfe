import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  public roleCount:number = 0;
  public employeeCount:number = 0;
  public companyCount:number = 0;
  constructor(private _apiService:ApiService){
    this.userList();
    this.employeeList();
    this.companyList();
  }

  userList() {
    this._apiService.ajaxCall('get','/list').subscribe((response:any) => {
      this.roleCount = response.users.length;
    },error => {
      console.log(error);
    })
  }

  employeeList() {
    this._apiService.customAPICall('employee/api/v1/list').subscribe((response:any) => {
      this.employeeCount = response.items.length;
      console.log(response);
    },error => {
      console.log(error);
    })
  }

  companyList() {
    this._apiService.customAPICall('company/api/v1/list').subscribe((response:any) => {
      this.companyCount = response.items.length;
      console.log(response);
    },error => {
      console.log(error);
    })
  }

  logOut() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
