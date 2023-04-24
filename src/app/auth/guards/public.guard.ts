import { Injectable, inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { Observable, take, tap, map } from 'rxjs';

import { AuthService } from '../services/auth.service';


@Injectable({ providedIn: 'root' })
export class PublicGuard {

    constructor() { }

}

const isAuthenticated = (): | boolean | Observable<boolean> => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.checkAuthentication()
        .pipe(
            take(1),
            tap((isAuthenticated: boolean) => {
                if (isAuthenticated) {
                    router.navigate(['./']);
                }
            }),
            map( isAuthenticated => !isAuthenticated )
        );
}

export const canActivatePublicGuard: CanActivateFn = isAuthenticated;
export const canMatchPublicGuard: CanMatchFn = isAuthenticated;