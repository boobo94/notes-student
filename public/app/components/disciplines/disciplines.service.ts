import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { ApiUrls } from '../../core/urls.config';

@Injectable()
export class DisciplinesService {
    discipline: any;

    constructor(private http: AuthHttp, private url: ApiUrls) {
        this.discipline = null
    }

    setCurrentDiscipline(disc: any) {
        this.discipline = disc;
    }

    getCurrentDiscipline() {
        return this.discipline
    }

    getAllDisciplines(): Promise<any> {
        return this.http.get(this.url.getAllDisciplines)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    insert(disc: any): Promise<any> {
        return this.http.post(this.url.insertDisciplines, disc)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    update(disc: any): Promise<any> {
        return this.http.put(this.url.updateSpecialization + disc.discipline_id, disc)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    delete(id: Number): Promise<any> {
        return this.http.delete(this.url.deleteDisciplines + id)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }


}