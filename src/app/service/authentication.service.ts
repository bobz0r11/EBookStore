import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../model/User';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    appURI = 'http://localhost:4000'

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    login(username: string, password: string): Observable<any> {
        //Hits the authentication interceptor on POST within '/auth' path
        return this.http.post<any>(`${this.appURI}/login/authenticate`, { username, password })
            .pipe(map(user => {
                if (user && user.token) {
                    // Store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        // Remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    //Returns empty array of objects if account doesn't exist
    accountExists(username) {
        return this.http.get<any>(`${this.appURI}/register/` + username);
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
}

