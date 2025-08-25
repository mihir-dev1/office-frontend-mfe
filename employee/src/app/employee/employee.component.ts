import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../core/common.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent {
  public employeeForm!: FormGroup;
  public employeeList: any[] = [];
  public isEdit: boolean = false;
  private selectedId: string = '';
  companies = [
    { id: '1', name: 'Tech Solutions Ltd' },
    { id: '2', name: 'Healthcare Plus' },
    { id: '3', name: 'Finance Corp' },
  ];

  roles = ['Admin', 'Manager', 'Developer', 'HR'];

  constructor(private fb: FormBuilder, private _commonService: CommonService) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      title: [''], // optional
      company: ['', Validators.required],
    });
    this.getEmployeeList();
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      if (this.isEdit) {
        this._commonService
          .ajaxCall('patch', `/${this.selectedId}`, this.employeeForm.value)
          .subscribe(
            (response: any) => {
              console.log(response);
              this.getEmployeeList();
              this.onCancel();
            },
            (error) => {
              console.log(error);
            }
          );
        return;
      } else {
        console.log('Employee Data:', this.employeeForm.value);
        this._commonService
          .ajaxCall('post', '/add', this.employeeForm.value)
          .subscribe(
            (response: any) => {
              console.log(response);
              this.employeeForm.reset();
              this.getEmployeeList();
            },
            (error) => {
              console.log(error);
            }
          );
      }
      //
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  getEmployeeList() {
    this._commonService.ajaxCall('get', '/list').subscribe(
      (response: any) => {
        this.employeeList = response.items || [];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure to delete?')) {
      this._commonService.ajaxCall('delete', `/${id}`).subscribe(
        (response: any) => {
          console.log(response);
          this.getEmployeeList();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  editEmployee(id: string): void {
    this.isEdit = true;
    this.selectedId = id;
    const emp = this.employeeList.find((e) => e._id === id);
    if (emp) {
      this.employeeForm.patchValue({
        firstName: emp.firstName,
        lastName: emp.lastName,
        email: emp.email,
        title: emp.title,
        company: emp.companyName,
      });
    }
  }

  searchEmployee(event: any) {
    const query = event.target.value.toLowerCase();
    if (query) {
      this.employeeList = this.employeeList.filter((employee) =>
        employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        (employee.title && employee.title.toLowerCase().includes(query)) ||
        (employee.companyName && employee.companyName.toLowerCase().includes(query))
      );
    } else {
      this.getEmployeeList();
    }
  }

  employeeFilter(event: any) {
    const company = event.target.value;
    if (company) {
      this.employeeList = this.employeeList.filter(
        (employee) => employee.companyName === company
      );
    } else {
      this.getEmployeeList();
    }
  }

  onCancel(): void {
    this.employeeForm.reset();
    this.isEdit = false;
    this.selectedId = '';
  }
}
