import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentsService } from './students.service';
import { SpecializationsService } from '../specializations/specializations.service';
import { GroupsService } from '../groups/groups.service';
import { ToastService } from '../../components/notifications/toast.service';
import { Messages } from '../../core/messages.config';

declare var $: any;// declare $ to use jquery


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
               <table class="bordered">
                    <thead>
                        <tr>
                            <th data-field="id">#</th>
                            <th data-field="full_name">Full Name</th>
                            <th data-field="registratio_number">Registation Number</th>
                            <th data-field="btns" class="right">Notes/Edit/Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr *ngFor="let stud of students">
                            <td>{{stud.student_id}}</td>
                            <td>{{stud.name}}</td>
                            <td>{{stud.registration_number}}</td>
                            <td class="right">
                                <button (click)="notes(stud)" class="waves-effect waves-light btn "><i class="material-icons">view_week</i></button>
                                <button (click)="edit(stud)" class="waves-effect waves-light btn "><i class="material-icons">mode_edit</i></button>
                                <button (click)="delete(stud.student_id)" class="waves-effect waves-light btn "><i class="material-icons">delete</i></button>
                            </td>
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

    constructor(private service: StudentsService, private router: Router) {
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
        
        
    }

    ngOnInit() {
        this.getStudent();
    }

    getStudent(): void {
        this.service.getUserWithUsername(this.myUsername)
            .then((result) => {
                this.student = result.data.student;

        console.log(this.student)
            })
            .catch((error) => {
                console.log(error)
            })
    }



}

