import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of, tap } from 'rxjs';

import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';


@Injectable({ providedIn: 'root' })
export class AuthService {

    // PROPIEDADES
    private baseUrl = environments.baseUrl;
    private user?: User;

    // CONSTRUCTOR
    constructor(private http: HttpClient) { }

    // METODOS
    get currentUser(): User | undefined {
        if (!this.user) return undefined;
        return structuredClone(this.user);
    }

    login(email: string, password: string): Observable<User> {
        // TODO: http.post('login', {email,password})

        return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
                tap(user => this.user = user),
                tap(user => localStorage.setItem('token', 'erasgnjvesd.eargmf.edtbvgfde'))
            )
    }

    logout() {
        this.user = undefined;
        localStorage.clear();
    }

    checkAuthentication(): Observable<boolean> {
        if (!localStorage.getItem('token')) return of(false)

        const token = localStorage.getItem('token');
        return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
                tap(user => this.user = user),
                /* Si el usuario existe, hacemos la doble negación para 
                asegurarnos que nos devuelve un valor boolean */
                map(user => !!user),
                catchError(err => of(false))
            );
    }

}
