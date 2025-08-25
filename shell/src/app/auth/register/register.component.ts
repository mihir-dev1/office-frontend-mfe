import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['user', Validators.required]
  });
  
  constructor(private fb: FormBuilder, private _apiService:ApiService,private _toastr: ToastrService,private _router: Router) {}
  
  onRegister() {
    this._apiService.ajaxCall('post','/register',this.registerForm.value).subscribe((response:any) => {
      if(response) {
        this._toastr.success(response.message, 'Success');
        this._router.navigate(['/login']);
      }
    },error => {
      console.log(error);
      this._toastr.error(error.error.message, 'Error');
    })
  }
  
}
