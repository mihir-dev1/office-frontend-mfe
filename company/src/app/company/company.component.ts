import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../core/common.service';
import { ToastrService } from 'ngx-toastr';

export interface company {
    _id: string,
    name:string,
    address:string,
    industry:string,
    website: string
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {

  public companyForm: FormGroup;
  public companyList: company[] = [];
  public isEdit:boolean = false;
  private selectedId:string = '';

  constructor(private fb: FormBuilder, private _router: Router,private _commonService:CommonService) {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      industry: ['', Validators.required],
      address: [''],
      website: ['', [Validators.pattern('https?://.+')]]
    });
   }


  ngAfterViewInit(): void {
    this.getCompanyList();
  }

  onSubmit() {
    if (this.companyForm.valid) {
      if(this.isEdit) {
        this._commonService.ajaxCall('patch',`/${this.selectedId}`,this.companyForm.value).subscribe((response:any) => {
          // this._toastr.success(response.message, 'Success');
          console.log(response);
          this.getCompanyList();
          this.onCancel();
        },error => {
          console.log(error);
        })
      } else {
        this._commonService.ajaxCall('post','/add',this.companyForm.value).subscribe((response:any) => {
          // this._toastr.success(response.message, 'Success');
          console.log(response);
          this.getCompanyList();
          this.onCancel();
        },error => {
          console.log(error);
        })
      }
    } else {
      this.companyForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.companyForm.reset();
    this.isEdit = false;
    this.selectedId = '';
  }

  searchCompany(event: any) {
    const query = event.target.value.toLowerCase();
    if (query) {
      this.companyList = this.companyList.filter(company => company.name.toLowerCase().includes(query));
    } else {
      this.getCompanyList();
    }
  }

  deleteCompany(id:string) {
    this._commonService.ajaxCall('delete',`/${id}`).subscribe(response => {
      this.getCompanyList();
    },error => {
      console.log(error);
    })
  }

  getCompanyList() {
    this.companyList = [];
    this._commonService.ajaxCall('get','/list').subscribe((response:any) => {
      this.companyList = response.items;
    },error => {
      console.log(error)
    })
  }

  editCompanyDetails(id:string) {
    this.isEdit = true;
    this.selectedId = id;
    this._commonService.ajaxCall('get',`/${id}`,this.companyForm.value).subscribe((response:any) => {
      this.companyForm = this.fb.group({
        name: [response.name, [Validators.required, Validators.minLength(3)]],
        industry: [response.industry, Validators.required],
        address: [response.address],
        website: [response.website, [Validators.pattern('https?://.+')]]
      });
    },error => {
      console.log(error);
    })
  }
}
