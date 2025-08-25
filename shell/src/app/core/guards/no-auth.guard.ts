import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);

  if (!_authService.isTokenValid()) {
    // Token is NOT valid → allow access (ex: login/register pages)
    return true;
  } else {
    // Token is valid → redirect to tickets
    _router.navigate(['/home']);
    return false;
  }
};
