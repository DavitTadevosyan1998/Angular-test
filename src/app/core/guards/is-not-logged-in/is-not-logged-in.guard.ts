import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthorizationService} from "../../services/authorization/authorization.service";

@Injectable({
  providedIn: 'root'
})
export class IsNotLoggedInGuard implements CanActivate {

  constructor(
    private router: Router,
    private authorizationService: AuthorizationService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAuthorized = this.authorizationService.isAuthorized;

    if (isAuthorized) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

}
