import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { ApiUrls } from '../../core/urls.config';

@Injectable()
export class GroupsService {
    group: any;

    constructor(private http: AuthHttp, private url: ApiUrls) {
        this.group = null
    }

    setCurrentDiscipline(group: any) {
        this.group = group;
    }

    getCurrentDiscipline() {
        return this.group
    }

    getAllDisciplines(): Promise<any> {
        return this.http.get(this.url.getAllGroups)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    insert(disc: any): Promise<any> {
        return this.http.post(this.url.insertGroups, disc)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    update(disc: any): Promise<any> {
        return this.http.put(this.url.updateGroups + disc.discipline_id, disc)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    delete(id: Number): Promise<any> {
        return this.http.delete(this.url.deleteGropups + id)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }


}