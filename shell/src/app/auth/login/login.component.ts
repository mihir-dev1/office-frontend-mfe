import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/core/interface/login';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  

  constructor(private fb: FormBuilder, private _authService:AuthService,private _router: Router,private _apiService:ApiService,private _toastr: ToastrService) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  
  onLogin() {
    console.log(this.loginForm.value)
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      this._apiService.ajaxCall('post','/login',this.loginForm.value).subscribe((response:any) => {
        if(response) {
          // Save token (you can also use sessionStorage)
          this._toastr.success(response.message, 'Success');
          this._authService.setUserData(response)
          this._router.navigate(['/home']);
        }
      },error => {
        console.log(error);
        this._toastr.error(error.error.message, 'Error');
      })
    }
  
  }
}
