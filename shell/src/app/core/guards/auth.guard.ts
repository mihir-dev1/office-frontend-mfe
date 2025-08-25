import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  let isUserLogin = localStorage.getItem('authToken');
  if (isUserLogin) {
      return true;
  }
  _router.navigate(['/login']);
  return false;
};
