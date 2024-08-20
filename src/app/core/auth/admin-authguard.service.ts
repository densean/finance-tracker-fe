import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AUTH_ROLES } from './auth.constants';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getRole()?.includes(AUTH_ROLES[1])) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
