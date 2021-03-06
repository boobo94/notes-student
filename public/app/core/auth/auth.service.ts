import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { ApiUrls } from '../urls.config';

@Injectable()
export class AuthService {
    constructor(private http: Http, private urls: ApiUrls, private router: Router) {

    }

    login(user: any): Promise<any> {
        return this.http.post(this.urls.loginUrl, user)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    logout() {
        localStorage.removeItem('userToken');
        localStorage.removeItem('username');

        this.router.navigate(['/login'])
    }

    loggedIn() {
        return tokenNotExpired('userToken');//userToken is saved in localStorage with this name
    }

    signup(user: any): Promise<any> {
        return this.http.post(this.urls.signUpUrl, user)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getRegistrationNumber(nr: any): Promise<any> {
        return this.http.get(this.urls.getStudentByRegistrationNumber + nr)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getUserWithThisRegitrationNumber(nr: any): Promise<any> {
        return this.http.get(this.urls.getStudentByRN + nr)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getUserWithUsername(username: any): Promise<any> {
        return this.http.get(this.urls.getStudentByUN + username)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }
}