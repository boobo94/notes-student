import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { ApiUrls } from '../../core/urls.config';
import { ToastService } from '../../components/notifications/toast.service';
import { Messages } from '../../core/messages.config';

@Injectable()
export class SpecializationsService {
    specialization: any;

    constructor(private http: AuthHttp, private url: ApiUrls, private router: Router) {
        this.specialization = null
    }

    setCurrentSpecialization(spec: any) {
        this.specialization = spec;
    }

    getCurrentSpecialization() {
        return this.specialization
    }

    getAllSpecializations(): Promise<any> {
        return this.http.get(this.url.getAllSpecializations)
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

    getSpecializationByID(id: number): Promise<any> {
        return this.http.get(this.url.getSpecialization + id)
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

    insert(spec: any): Promise<any> {
        return this.http.post(this.url.insertSpecialization, spec)
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

    update(spec: any): Promise<any> {
        return this.http.put(this.url.updateSpecialization + spec.specialization_id, spec)
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
        return this.http.delete(this.url.deleteSpecialization + id)
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