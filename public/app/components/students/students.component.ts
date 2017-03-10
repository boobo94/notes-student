import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentsService } from './students.service';
import { ToastService } from '../../components/notifications/toast.service';
import { Messages } from '../../core/messages.config';

@Component({
    selector: 'students-component',
    template: `
        <div class="container">
            <div class="row">
                <div class="col s12">
                    <button class="btn-floating btn-large waves-effect waves-light red right" (click)="add()"><i class="material-icons">add</i></button>
                </div>
                <table class="bordered">
                    <thead>
                        <tr>
                            <th data-field="id">#</th>
                            <th data-field="full_name">Full Name</th>
                            <th data-field="registratio_number">Registation Number</th>
                            <th data-field="btns" class="right">Edit/Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr *ngFor="let stud of students">
                            <td>{{stud.student_id}}</td>
                            <td>{{stud.name}}</td>
                            <td>{{stud.registration_number}}</td>
                            <td class="right">
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
export class StudentsComponent implements OnInit {
    students: any[]

    constructor(private service: StudentsService, private router: Router) {

    }

    ngOnInit(): void {
        this.getAllStudents()
    }

    getAllStudents(): void {
        this.service.getAllStudents()
            .then((r) => {
                this.students = r.data;
            })
            .catch((error) => {
                console.log(error)
            })

    }

    add(): void {
        this.router.navigate(['admin/students/add'])
    }

    edit(student: any): void {
        this.service.setCurrentStudent(student)
        this.router.navigate(['admin/students/edit'])
    }

    delete(id: Number): void {
        var areSure = confirm(Messages.message('deleteQuestion'))

        if (areSure) {
            this.service.delete(id)
                .then((r) => {
                    if (r.statusCode == 0) {
                        ToastService.toast(Messages.message('deletedWithSuccess'))
                        this.getAllStudents() // reload all students
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }
}