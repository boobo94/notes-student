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

    //todo: singup
}