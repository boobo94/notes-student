import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { ApiUrls } from '../../core/urls.config';
import { ToastService } from '../../components/notifications/toast.service';
import { Messages } from '../../core/messages.config';

@Injectable()
export class UsersService {
    user: any;

    constructor(private http: AuthHttp, private url: ApiUrls, private router: Router) {
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
                if (error.status == 403){    
                    ToastService.toast(Messages.message('notauthorized'))
                    this.router.navigate(['/home']);
                }
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
                if (error.status == 403){    
                    ToastService.toast(Messages.message('notauthorized'))
                    this.router.navigate(['/home']);
                }
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
                if (error.status == 403){    
                    ToastService.toast(Messages.message('notauthorized'))
                    this.router.navigate(['/home']);
                }
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
                if (error.status == 403){    
                    ToastService.toast(Messages.message('notauthorized'))
                    this.router.navigate(['/home']);
                }
                console.log(error);
            })
    }

    getRegistrationNumber(nr: any): Promise<any> {
        return this.http.get(this.url.getStudentByRegistrationNumber + nr)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                if (error.status == 403){    
                    ToastService.toast(Messages.message('notauthorized'))
                    this.router.navigate(['/home']);
                }
                console.log(error);
            })
    }


}