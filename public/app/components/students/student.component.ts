import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentsService } from './students.service';
import { ToastService } from '../../components/notifications/toast.service';
import { Messages } from '../../core/messages.config';

/**
 * todo: implement this student component
 * todo: when I display the student, maybe he has many specialization in account
 * 
 * in template create a section for specializations
 *      in the right corner of this section put a + button to add a section (in this way you can register this student
 *      to a new specialization)
 *      
 *      show a list with the name of all specializations and in his right side edit and delete buttons for each one
 *          if I press edit, under that specialization will be displayed a list with all the groups for each year
 *          here i need to display another + sign for adding a new group, register student into new study year
 *          
 *          display a list with all the groups, with edit and delete buttons
 *              if edit display a the data for selected group
 * 
 * 
 */

@Component({
    selector: 'student-component',
    template: `
        <div class="container">
            <div class="row">
                <form #studentform="ngForm">
                    <div *ngIf="editMode" class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input [disabled]="editMode" id="student_id" type="text" name="student_id" class="validate" required="" aria-required="true" [(ngModel)]="student.student_id">
                        <label [class.active]="student.student_id" for="student_id">Student ID</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input id="name" type="text" name="name" class="validate" required="" aria-required="true" [(ngModel)]="student.name">
                        <label [class.active]="student.name" for="name">Name</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input id="registration_number" type="text" name="registration_number" class="validate" required="" aria-required="true" [(ngModel)]="student.registration_number">
                        <label [class.active]="student.registration_number" for="registration_number">Registration Number</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input id="tax" type="text" name="tax" class="validate" required="" aria-required="true" [(ngModel)]="student.tax">
                        <label [class.active]="student.tax" for="tax">Tax</label>
                    </div>
                    <div class="col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <button class="btn waves-effect waves-light right" type="submit" (click)="studentform.form.valid ? (editMode ? update() : insert()) : null">Submit
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        `
})
export class StudentComponent implements OnInit {
    student: any
    editMode: Boolean

    constructor(private service: StudentsService, private router: Router) {

        this.student = { // create a null object to escape errors in template
            student_id: null, //todo: change this
            name: null,
            tax: null, // todo in component I can create a dropdown with S and T
            registration_number: null
        }
        this.editMode = false

    }

    ngOnInit() {
        if (this.router.url.indexOf('edit') != -1) {
            this.editMode = true
            let stud: any = this.service.getCurrentStudent();

            if (stud != null)
                this.student = stud;
            else //if is no more student in service [ refresh the page ] redirect
                this.router.navigate(['admin/students'])
        }
        else {
            this.editMode = false
        }
    }

    update(): void {
        this.service.update(this.student)
            .then((r) => {
                if (r.statusCode == 0) {
                    ToastService.toast(Messages.message('updatedWithSuccess'))
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    insert(): void {
        this.service.insert(this.student)
            .then((r) => {
                if (r.statusCode == 0) {
                    ToastService.toast(Messages.message('insertedWithSuccess'))
                    this.router.navigate(['admin/students'])
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //todo: implement edit and check if registration nr exists ...
    RegistrationNumberExists() {
        if (this.student.registration_number) {

            this.service.getRegistrationNumber(this.student)
                .then((r) => {
                    if (r.statusCode == 0) { // registration number is assigned to a student
                        this.service.getUserWithThisRegitrationNumber(this.student.registration_number)
                            .then((r) => {
                                if (r.statusCode == 1) { //student doesn't have an account yet
                                    return true;
                                }
                                else if (r.statusCode == 0) {
                                    ToastService.toast(Messages.message('accoutnAlreadyExists'));
                                }
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    }
                    else if (r.statusCode == 1) { // registration number doesn't exist
                        ToastService.toast(Messages.message('noRegistrationNumber'));
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}

