import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentsService } from './students.service';
import { SpecializationsService } from '../specializations/specializations.service';
import { ToastService } from '../../components/notifications/toast.service';
import { Messages } from '../../core/messages.config';

declare var $: any;// declare $ to use jquery

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
                <div class="col s12 m6">
                    <form #studentform="ngForm">
                    
                        <div *ngIf="editMode" class="input-field col s10 offset-s1">
                            <input [disabled]="editMode" id="student_id" type="text" name="student_id" class="validate" required="" aria-required="true" [(ngModel)]="student.student_id">
                            <label [class.active]="student.student_id" for="student_id">Student ID</label>
                        </div>
                        <div class="input-field col s10 offset-s1">
                            <input id="name" type="text" name="name" class="validate" required="" aria-required="true" [(ngModel)]="student.name">
                            <label [class.active]="student.name" for="name">Name</label>
                        </div>
                        <div class="input-field col s10 offset-s1">
                            <input id="registration_number" type="text" name="registration_number" class="validate" required="" aria-required="true" [(ngModel)]="student.registration_number">
                            <label [class.active]="student.registration_number" for="registration_number">Registration Number</label>
                        </div>
                        <div class="input-field col s10 offset-s1">
                            <input id="tax" type="text" name="tax" class="validate" required="" aria-required="true" [(ngModel)]="student.tax">
                            <label [class.active]="student.tax" for="tax">Tax</label>
                        </div>

                        <div class="col s10 offset-s1">
                            <button class="btn waves-effect waves-light right" type="submit" (click)="studentform.form.valid ? (editMode ? update() : insert()) : null">Submit
                                <i class="material-icons right">send</i>
                            </button>
                        </div>

                    </form>
                </div>

                <div class="col s12 m6">
                    
                    <div class="col s12">
                        <h4 class="col s10">Specializations</h4>
                        <button class="dropdown-button btn btn-floating btn-large waves-effect waves-light red right" data-activates='dropdownNewSpecialization'><i class="material-icons">add</i></button>
                        <ul id='dropdownNewSpecialization' class='dropdown-content'>
                            <li *ngFor="let spec of specializations"> <a (click)="addSpecialization(spec.specialization_id)">{{ spec.name }}</a></li>
                        </ul>
                    </div>

                    <ul class="col s12 collapsible popout" data-collapsible="accordion">
                        <li *ngFor="let spec of studentSpecializations">
                            <div class="collapsible-header"><i class="material-icons">open_in_new</i>{{ spec.name }}</div>
                            <div class="collapsible-body">
                                
                                <span>Lorem ipsum dolor sit amet.</span>

                                <button class="btn" (click)="removeSpecialization(spec.specialization_id)"><i class="material-icons">delete</i></button>
                            </div>
                        </li>
                    </ul>


                </div>

                    
            </div>
        </div>
        `
})
export class StudentComponent implements OnInit {
    student: any
    editMode: Boolean
    specializations: any[]
    studentSpecializations: any

    constructor(private service: StudentsService, private router: Router, private specService: SpecializationsService, ) {

        this.student = { // create a null object to escape errors in template
            student_id: null, //todo: change this
            name: null,
            tax: null, // todo in component I can create a dropdown with S and T
            registration_number: null,
            specialization_id: null,
            specializations: null
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

        this.getAllSpecializations();
    }

    update(): void {
        this.service.update(this.student)
            .then((r) => {
                if (r.statusCode == 0) {
                    ToastService.toast(Messages.message('updatedWithSuccess'))
                }
                else if (r.statusCode == 3) {
                    ToastService.toast(Messages.message('thisRecordWasNotFound'))
                }
                else {
                    ToastService.toast(Messages.message('notModified'))
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

    getAllSpecializations(): void {
        this.specService.getAllSpecializations()
            .then((r) => {
                var specializations = r.data;
                this.specializations = specializations;

                var currentSpecializationsIds = this.student.specializations

                specializations = specializations.filter(function (spec) {
                    var exists = false;
                    $.each(currentSpecializationsIds, function (index, val) {
                        if (val.specialization_id == spec.specialization_id)
                            exists = true
                    })

                    return exists
                })
                this.studentSpecializations = specializations;

                $(document).ready(function () {
                    $('.collapsible').collapsible();

                    $('.dropdown-button').dropdown({
                        inDuration: 300,
                        outDuration: 225,
                        constrainWidth: false, // Does not change width of dropdown to that of the activator
                        hover: false, // Activate on hover
                        gutter: 0, // Spacing from edge
                        belowOrigin: false, // Displays dropdown below the button
                        alignment: 'left', // Displays dropdown with edge aligned to the left of button
                        stopPropagation: false // Stops event propagation
                    });

                });
            })
            .catch((error) => {
                console.log(error)
            })

    }

    addSpecialization(specialization_id) {
        console.log(specialization_id)
        let spec = {
            specialization_id: specialization_id,
            student_id: this.student.student_id
        }

        this.service.addSpecializationToStudent(spec)
            .then((r) => {
                if (r.statusCode == 0)
                    ToastService.toast(Messages.message('insertedWithSuccess'))
                else
                    ToastService.toast(Messages.message('notModified'))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    removeSpecialization(specialization_id) {
        let spec = {
            specialization_id: specialization_id,
            student_id: this.student.student_id
        }

        this.service.removeSpecializationFromStudent(spec)
            .then((r) => {
                if (r.statusCode == 0)
                    ToastService.toast(Messages.message('deletedWithSuccess'))
                else
                    ToastService.toast(Messages.message('notModified'))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //todo: implement edit and check if registration nr exists ...
    /*RegistrationNumberExists() {
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
    }*/
}

