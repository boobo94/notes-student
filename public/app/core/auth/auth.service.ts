import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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

    //todo: singup
}