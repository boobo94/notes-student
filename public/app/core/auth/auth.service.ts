import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { ApiUrls } from '../urls.config';

@Injectable()
export class AuthService {
    constructor(private http: Http, private urls: ApiUrls) {

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

    //todo: check if student doesn't have already an account
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
}