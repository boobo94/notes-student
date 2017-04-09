import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';

import { StudentsService } from './students.service';
import { GroupsService } from '../groups/groups.service';
import { NotesService } from '../notes/notes.service';
import { ToastService } from '../../components/notifications/toast.service';
import { Messages } from '../../core/messages.config';

@Component({
    selector: 'student-account-component',
    template: `
        <div class="container">
            <div class="row">
                <div class="col s12">
                    <ul class="collapsible" data-collapsible="accordion" materialize="collapsible">
                        <li>
                            <div class="collapsible-header"><i class="material-icons">perm_identity</i>About You</div>
                            <div class="collapsible-body">
                                <p>Name: {{student.name}}</p>
                                <p>Registration Number: {{student.registration_number}}</p>
                                <p>Financial: {{student.tax}}</p>
                                <p>Specialization: <span *ngFor="let spec of student.specializations; let isLast=last">{{spec.name}}{{isLast ? '' : ', '}}</span></p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="col s12">
                    <div class="input-field col s12 m4 l3">
                        <select id="specialization_id" name="specialization_id" materialize="material_select" [materializeSelectOptions]="selectOptions" (change)="getGroups()" [(ngModel)]="selectedSpecialization">
                            <option value="" disabled >Choose your option</option>
                            <option *ngFor="let spec of student.specializations" [value]="spec.specialization_id" >{{spec.name}}</option>
                        </select>
                        <label>Specialization</label>
                    </div>
                    <div class="input-field col s12 m4 l3">
                        <select id="group_id" name="group_id" materialize="material_select" [materializeSelectOptions]="selectOptions" (change)="getNotes()" [(ngModel)]="selectedYear">
                            <option value="" >Choose your option</option>
                            <option *ngFor="let group of groups" [value]="group.year" >{{group.year}} - {{group.name}}</option>
                        </select>
                        <label>Year - Group</label>
                    </div>
                    <div class="input-field col s12 m4 l3">
                        <select id="semester" name="semester" materialize="material_select" [materializeSelectOptions]="selectOptions" (change)="getNotes()" [(ngModel)]="semester">
                            <option value="" >Choose your option</option>
                            <option [value]="1" >1</option>
                            <option [value]="2" >2</option>
                        </select>
                        <label>Semester</label>
                    </div>
                </div>
               <table class="bordered">
                    <thead>
                        <tr>
                            <th data-field="discipline">Discipline</th>
                            <th data-field="note">Note</th>
                            <th data-field="examination">Examination</th>
                            <th data-field="credit_points">Credits</th>
                            <th data-field="exam_date">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr *ngFor="let note of notes">
                            <td>{{note.disciplines.name}}</td>
                            <td>{{note.note}}</td>
                            <td>{{note.disciplines.examination}}</td>
                            <td>{{note.disciplines.credit_points}}</td>
                            <td>{{note.exam_date | date:'longDate'}}</td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
        `
})
export class StudentAccountComponent implements OnInit {
    myUsername: String;
    student: any;
    groups: any;
    selectedSpecialization: any;
    selectedYear: any;
    semester: any;
    notes: any;

    constructor(private service: StudentsService, private router: Router, private groupService: GroupsService, private noteService: NotesService) {
        this.myUsername = localStorage.getItem('username');
        this.student = {
            student_id: null,
            name: null,
            registration_number: null,
            tax: null,
            specializations: [
                {
                    specialization_id: null,
                    name: null
                }
            ]
        }
        this.groups = [
            {
                group_id: null,
                name: null,
                specialization_id: null,
                student_id: null,
                year: null
            }
        ]
        this.notes = [{
            discipline_id: null,
            disciplines: {
                name: null,
                credit_points: null,
                examination: null,
                semester: null,
                year: null
            },
            exam_date: null,
            note: null,
            note_id: null,
            specialization_id: null,
            student_id: null
        }]
        this.selectedSpecialization = null;
        this.selectedYear = null;
        this.semester = null
    }

    ngOnInit() {
        this.getStudent();
    }

    getStudent(): void {
        this.service.getUserWithUsername(this.myUsername)
            .then((result) => {
                this.student = result.data.student;
                this.selectedSpecialization = (this.student.specializations) ? this.student.specializations[0].specialization_id : null;
                this.getGroups(); // get all groups for this student
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getGroups(): void {
        var params: URLSearchParams = new URLSearchParams();
        params.set('specialization_id', this.selectedSpecialization);

        this.groupService.getGroupById(this.student.student_id, params)
            .then((result) => {
                this.groups = result.data;
                this.getNotes()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getNotes(): void {
        var params: URLSearchParams = new URLSearchParams();
        params.set('student_id', this.student.student_id);
        params.set('specialization_id', this.selectedSpecialization);
        if (this.selectedYear)
            params.set('year', this.selectedYear);
        if (this.semester)
            params.set('semester', this.semester);

        this.noteService.getAllNotes(params)
            .then((result) => {
                this.notes = result.data;
            })
            .catch((error) => {
                console.log(error)
            })
    }



}

