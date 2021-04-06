import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.loginService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['login']);
      }
  }

  constructor(private router: Router, private loginService: LoginService) {
  }

}
