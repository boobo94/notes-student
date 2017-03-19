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

    setCurrentGroups(group: any) {
        this.group = group;
    }

    getCurrentGroups() {
        return this.group
    }

    getAllGroups(): Promise<any> {
        return this.http.get(this.url.getAllGroups)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getGroupById(student_id): Promise<any> {
        return this.http.get(this.url.getGroup + student_id)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    insert(group: any): Promise<any> {
        return this.http.post(this.url.insertGroups, group)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    update(group: any): Promise<any> {
        return this.http.put(this.url.updateGroups + group.group_id, group)
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