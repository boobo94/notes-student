import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { ApiUrls } from '../../core/urls.config';

@Injectable()
export class UsersService {
    user: any;

    constructor(private http: AuthHttp, private url: ApiUrls) {
        this.user = null
    }

    setCurrentUser(spec: any) {
        this.user = spec;
    }

    getCurrentUser() {
        return this.user
    }

    getAllUsers(): Promise<any> {
        return this.http.get(this.url.getAllUsers)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    insert(usr: any): Promise<any> {
        return this.http.post(this.url.insertUsers, usr)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    update(usr: any): Promise<any> {
        return this.http.put(this.url.updateUsers + usr.user_id, usr)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    delete(id: Number): Promise<any> {
        return this.http.delete(this.url.deleteUsers + id)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }


}