import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { ApiUrls } from '../../core/urls.config';

@Injectable()
export class StudentsService {
    student: any;

    constructor(private http: AuthHttp, private url: ApiUrls) {
        this.student = null
    }

    setCurrentStudent(stud: any) {
        this.student = stud;
    }

    getCurrentStudent() {
        return this.student
    }

    getAllStudents(): Promise<any> {
        return this.http.get(this.url.getAllStudents)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    insert(stud: any): Promise<any> {
        return this.http.post(this.url.insertStudents, stud)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    update(stud: any): Promise<any> {
        return this.http.put(this.url.updateStudents + stud.student_id, stud)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    delete(id: Number): Promise<any> {
        return this.http.delete(this.url.deleteStudents + id)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
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
                console.log(error);
            })
    }

    getUserWithThisRegitrationNumber(nr: any): Promise<any> {
        return this.http.get(this.url.getStudentByRN + nr)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getUserWithUsername(username: any): Promise<any> {
        return this.http.get(this.url.getStudentByUN + username)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    addSpecializationToStudent(spec: any): Promise<any> {
        return this.http.post(this.url.addSpecializationToStudent, spec)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }


}