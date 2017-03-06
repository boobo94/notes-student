import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { ApiUrls } from '../../core/urls.config';

@Injectable()
export class SpecializationsService {
    constructor(private http: AuthHttp, private url: ApiUrls) {

    }

    getAllSpecializations(): Promise<any> {
        return this.http.get(this.url.getAllSpecializations)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

}