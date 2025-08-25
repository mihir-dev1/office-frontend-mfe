import { Injectable } from '@angular/core';
import { Login } from '../core/interface/login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  setUserData(data:Login) {
    if(data.token) {
      localStorage.setItem(environment.lsKeys.tokenKey, data.token);
    }
    localStorage.setItem(environment.lsKeys.userKey, JSON.stringify(data));
  }

  isTokenValid(): string | null {
    return localStorage.getItem(environment.lsKeys.tokenKey);;
}
}
