import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { ApiUrls } from '../../core/urls.config';

@Injectable()
export class NotesService {
    note: any;
    student: any;
    specialization: any;

    constructor(private http: AuthHttp, private url: ApiUrls) {
        this.note = null
    }

    setCurrentNote(note: any) {
        this.note = note;
    }

    getCurrentNote() {
        return this.note
    }

    setCurrentStudent(student: any) {
        this.student = student;
    }

    getCurrentStudent() {
        return this.student;
    }

    setCurrentSpecialization(specialization: any) {
        this.specialization = specialization;
    }

    getCurrentSpecialization() {
        return this.specialization;
    }

    getAllNotes(params): Promise<any> {
        return this.http.get(this.url.getAllNotes, { search: params })
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getAllStudentNotes(noteIDS: any): Promise<any> {
        return this.http.get(this.url.getAllStudentNotes + noteIDS.student_id + '/' + noteIDS.specialization_id)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    insert(note: any): Promise<any> {
        return this.http.post(this.url.insertNote, note)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    update(note: any): Promise<any> {
        return this.http.put(this.url.updateNote + note.note_id, note)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    delete(id: Number): Promise<any> {
        return this.http.delete(this.url.deleteNote + id)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }

}