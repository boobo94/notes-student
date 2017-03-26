import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentsService } from './students.service';
import { SpecializationsService } from '../specializations/specializations.service';
import { GroupsService } from '../groups/groups.service';
import { ToastService } from '../../components/notifications/toast.service';
import { Messages } from '../../core/messages.config';

declare var $: any;// declare $ to use jquery


@Component({
    selector: 'student-component',
    template: `
        <div class="container">
            <div class="row">
                <div class="col s12 m6">
                    <h4 class="col s10 offset-s1">Student</h4>
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
                            <li *ngFor="let spec of allSpecializations"> <a (click)="addSpecialization(spec.specialization_id)">{{ spec.name }}</a></li>
                        </ul>
                    </div>

                    <ul class="col s12 collapsible popout" data-collapsible="accordion">
                        <li *ngFor="let spec of studentSpecializations">
                            <div class="collapsible-header"><i class="material-icons">open_in_new</i>{{ spec.name }}</div>
                            <div class="collapsible-body">
                                <button (click)="addNewGroup()" class="btn btn-floating btn-large waves-effect waves-light red right"><i class="material-icons">add</i></button>
                                <h5>Groups</h5>

                                <div *ngIf="newGroup">
                                    <form #addGroupform="ngForm">
                                        <div class="input-field">
                                            <input id="name" type="text" name="name" class="validate" required="" aria-required="true" [(ngModel)]="newGroupTemp.name">
                                            <label [class.active]="newGroupTemp.name" for="name">Name</label>
                                        </div>
                                        <div class="input-field">
                                            <input id="year" type="number" name="year" class="validate" required="" aria-required="true" [(ngModel)]="newGroupTemp.year">
                                            <label [class.active]="newGroupTemp.year" for="year">year</label>
                                        </div>

                                        <div class="input-field">
                                            <button class="btn waves-effect waves-light" type="submit" (click)="addGroupform.form.valid ? insertGroup(spec.specialization_id) : null">Submit
                                                <i class="material-icons right">send</i>
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <ul class="collapsible" data-collapsible="accordion">
                                    <li *ngFor="let group of spec.groups">
                                        <div class="collapsible-header"><i class="material-icons">view_module</i>{{ group.name }}</div>
                                        <div class="collapsible-body">
                                            
                                            <form #groupsform="ngForm">
                                                <div class="input-field">
                                                    <input [disabled]="editMode" id="group_id" type="text" name="group_id" class="validate" required="" aria-required="true" [(ngModel)]="group.group_id">
                                                    <label [class.active]="group.group_id" for="group_id">Group ID</label>
                                                </div>
                                                <div class="input-field">
                                                    <input id="name" type="text" name="name" class="validate" required="" aria-required="true" [(ngModel)]="group.name">
                                                    <label [class.active]="group.name" for="name">Name</label>
                                                </div>
                                                <div class="input-field">
                                                    <input id="year" type="text" name="year" class="validate" required="" aria-required="true" [(ngModel)]="group.year">
                                                    <label [class.active]="group.year" for="year">year</label>
                                                </div>

                                                <div class="input-field">
                                                    <button class="btn waves-effect waves-light" type="submit" (click)="groupsform.form.valid ? editGroup(group) : null">Submit
                                                        <i class="material-icons right">send</i>
                                                    </button>
                                                    <button class="btn" (click)="removeGroup(group.group_id)"><i class="material-icons">delete</i></button>
                                                </div>
                                            </form>

                                        </div>
                                    </li>
                                </ul>
                                

                                <button class="btn right" (click)="removeSpecialization(spec.specialization_id)"><i class="material-icons">delete</i></button>
                                <br>
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
    allSpecializations: any[]
    studentSpecializations: any
    allGroups: any
    newGroup: Boolean
    newGroupTemp: any

    constructor(private service: StudentsService, private router: Router, private specService: SpecializationsService, private groupService: GroupsService) {

        this.student = { // create a null object to escape errors in template
            student_id: null, //todo: change this
            name: null,
            tax: null, // todo in component I can create a dropdown with S and T
            registration_number: null,
            specialization_id: null,
            specializations: null
        }
        this.editMode = false
        this.newGroup = false
        this.newGroupTemp = {
            student_id: null,
            specialization_id: null,
            name: null,
            year: null
        }
    }

    ngOnInit() {
        if (this.router.url.indexOf('edit') != -1) {
            this.editMode = true
            let stud: any = this.service.getCurrentStudent();

            if (stud != null)
                this.student = stud;
            else //if is no more student in service [ refresh the page ] redirect
                this.router.navigate(['admin/students'])

            this.getAllSpecializations();
            this.getGroups()
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
                    this.student = this.service.setCurrentStudent(r.data);
                    this.router.navigate(['admin/students/edit'])

                }
                //todo: check if registration number is used by another student
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getAllSpecializations(): void {
        this.specService.getAllSpecializations()
            .then((r) => {
                var specializations = r.data;
                this.allSpecializations = specializations;

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
        let spec = {
            specialization_id: specialization_id,
            student_id: this.student.student_id
        }

        this.service.addSpecializationToStudent(spec)
            .then((r) => {
                if (r.statusCode == 0) {
                    this.studentSpecializations.push(this.getSpecializationsById(specialization_id)) // add the specialization created now in studentSpecializations array
                    ToastService.toast(Messages.message('insertedWithSuccess'))
                }
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
                if (r.statusCode == 0) {
                    var specializationIndex = this.getIndexStudentSpecializationsById(specialization_id)
                    delete this.studentSpecializations[specializationIndex].groups; // remove this object because if not next time will prepopulated
                    this.studentSpecializations.splice(specializationIndex, 1) // delete from studentSpecializations array deleted specialization
                    ToastService.toast(Messages.message('deletedWithSuccess'))
                }
                else
                    ToastService.toast(Messages.message('notModified'))
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    getSpecializationsById(id): any {
        var specialization = null;
        $.each(this.allSpecializations, function (index, value) {
            if (value.specialization_id == id)
                specialization = value;
        });

        return specialization
    }

    getIndexStudentSpecializationsById(id): any {
        var specializationIndex = null;
        $.each(this.allSpecializations, function (index, value) {
            if (value.specialization_id == id)
                specializationIndex = index;
        });

        return specializationIndex
    }

    getGroups(): void {
        this.groupService.getGroupById(this.student.student_id)
            .then((r) => {

                var studentSpecializationsTemp = this.studentSpecializations;

                //add a group to its studentSpecializations
                $.each(studentSpecializationsTemp, function (index, value) {
                    var group = []
                    $.each(r.data, function (index2, value2) {
                        if (value.specialization_id == value2.specialization_id)
                            group.push(value2);
                    })

                    studentSpecializationsTemp[index].groups = group
                })

                this.studentSpecializations = studentSpecializationsTemp;
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getStudentGroupSpecializationsById(id): any {
        var specializationIndex = null;
        $.each(this.studentSpecializations, function (index, value) {
            if (value.specialization_id == id)
                specializationIndex = index;
        });

        return specializationIndex
    }

    insertGroup(specialization_id): void {
        this.newGroupTemp.specialization_id = specialization_id;
        this.newGroupTemp.student_id = this.student.student_id;

        this.groupService.insert(this.newGroupTemp)
            .then((r) => {
                if (r.statusCode == 0) {
                    var groupIndex = this.getStudentGroupSpecializationsById(specialization_id)

                    //if groups exists in studentSpecializations save it else create a new array
                    var groups = (this.studentSpecializations[groupIndex].groups) ? this.studentSpecializations[groupIndex].groups : []
                    groups.push(r.data)
                    this.studentSpecializations[groupIndex].groups = groups

                    this.newGroup = false;
                    this.newGroupTemp = {
                        student_id: null,
                        specialization_id: null,
                        name: null,
                        year: null
                    }
                    $(document).ready(function () {
                        $('.collapsible').collapsible();
                    })//load again collapsible for group wrapper

                    ToastService.toast(Messages.message('insertedWithSuccess'))
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    editGroup(group): void {
        this.groupService.update(group)
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

    removeGroup(group_id): void {
        this.groupService.delete(group_id)
            .then((r) => {
                if (r.statusCode == 0) {
                    var groupIndex = this.removeStudentGroupById(group_id) // delete from studentSpecializations array deleted group
                    ToastService.toast(Messages.message('deletedWithSuccess'))
                }
                else
                    ToastService.toast(Messages.message('notModified'))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    removeStudentGroupById(id): any {
        $.each(this.studentSpecializations, function (index, value) {
            $.each(value.groups, function (index2, value2) {
                if (value2.group_id == id) {
                    value.groups.splice(index2, 1)
                }
            })
        });
    }

    //  getIndexStudentGroupById(id): any {
    //     var specializationIndex = null;
    //     $.each(this.studentSpecializations, function (index, value) {
    //         $.each(value.groups, function (index2, value2) {
    //             if (value2.group_id == id) {
    //                 specializationIndex = index2
    //             }
    //         })
    //     });

    //     return specializationIndex
    // }

    addNewGroup(): void {
        this.newGroup = true;
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

