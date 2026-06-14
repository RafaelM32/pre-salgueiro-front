import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/loginService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private loginService = inject(LoginService);
  private router = inject(Router);

  canActivate(): boolean {
    if (this.loginService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
