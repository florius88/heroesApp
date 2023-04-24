import { Injectable, inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard {

    constructor() { }

}

const isAuthenticated = (): | boolean | Observable<boolean> => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.checkAuthentication()
        .pipe(
            take(1),
            tap((isAuthenticated: boolean) => {
                if (!isAuthenticated) {
                    router.navigate(['./auth/login']);
                }
            }),
        );
}

export const canActivateAuthGuard: CanActivateFn = isAuthenticated;
export const canMatchAuthGuard: CanMatchFn = isAuthenticated;