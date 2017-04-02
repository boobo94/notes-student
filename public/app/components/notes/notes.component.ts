import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { NotesService } from './notes.service';
import { SpecializationsService } from '../specializations/specializations.service';
import { ToastService } from '../../components/notifications/toast.service';
import { Messages } from '../../core/messages.config';

declare var $: any;// declare $ to use jquery

@Component({
    selector: 'notes-component',
    template: `
        <div class="container">
            <div class="row">
                <div class="col s12">
                   
                    <div class="input-field col s8 ">
                     <label [class.active]="selectedSpecialization" >Specialization</label>
                        <select id="specialization_id" name="specialization_id" materialize="material_select" [materializeSelectOptions]="selectOptions" [(ngModel)]="selectedSpecialization" (change)="showNotes()">
                            <option value="" disabled >Choose your option</option>
                            <option *ngFor="let specialization of allStudentSpecialization" [ngValue]="specialization" >{{specialization.name}}</option>
                        </select>
                    </div>

                    <button class="btn-floating btn-large waves-effect waves-light red right" (click)="add()"><i class="material-icons">add</i></button>
                </div>
                <table class="bordered">
                    <thead>
                        <tr>
                            <th data-field="id">#</th>
                            <th data-field="discipline">Discipline</th>
                            <th data-field="name">Notes</th>
                            <th data-field="btns" class="right">Edit/Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr *ngFor="let note of notes">
                            <td>{{note.note_id}}</td>
                            <td>{{note.disciplines.name}}</td>
                            <td>{{note.note}}</td>
                            <td class="right">
                                <button (click)="edit(note)" class="waves-effect waves-light btn "><i class="material-icons">mode_edit</i></button>
                                <button (click)="delete(note.note_id)" class="waves-effect waves-light btn "><i class="material-icons">delete</i></button>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    `
})
export class NotesComponent {
    notes: any[];
    student: any;
    allStudentSpecialization: any[];
    selectedSpecialization: any;

    constructor(private service: NotesService, private router: Router, private specializationService: SpecializationsService) {

        this.student = this.service.getCurrentStudent(); // get the student data
        if (!this.student) //if student is not set redirect to students
            this.router.navigate(['admin/students']);

        this.selectSpecialization();
    }

    getAllNotes(): void {
        var noteIDS = {
            student_id: this.student.student_id,
            specialization_id: this.selectedSpecialization.specialization_id
        }
        this.service.getAllStudentNotes(noteIDS)
            .then((r) => {
                this.notes = r.data;
            })
            .catch((error) => {
                console.log(error)
            })
    }

    add(): void {
        this.router.navigate(['admin/notes/add'])
    }

    edit(note: any): void {
        this.service.setCurrentNote(note)
        this.router.navigate(['admin/notes/edit'])
    }

    delete(id: Number): void {
        var areSure = confirm(Messages.message('deleteQuestion'))

        if (areSure) {
            this.service.delete(id)
                .then((r) => {
                    if (r.statusCode == 0) {
                        ToastService.toast(Messages.message('deletedWithSuccess'))
                        this.getAllNotes() // reload all notes
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }

    selectSpecialization(): void {
        if (this.student.specializations && this.student.specializations.length == 1) { // if student is recorded in a single specialization

            this.specializationService.getSpecializationByID(this.student.specializations[0].specialization_id) // get all data for that specialization
                .then((result) => {
                    if (result.statusCode == 0) {
                        this.selectedSpecialization = result.data;// set selectedSpecialization

                        let tempAllSpecializations = []; tempAllSpecializations.push(result.data);// use a temp variable to sett allStudentSpecialization, to display the current specialization in the header of page
                        this.allStudentSpecialization = tempAllSpecializations;

                        this.showNotes();
                    }

                })
                .catch((error) => {
                    console.log(error)
                })
        }
        else if (this.student.specializations && this.student.specializations.length > 1) {
            // prepare selector from modal with student's specializations
            this.getAllStudentSpecializations(this.student.specializations);
        }
        else {//student doesn't have a specialization assigned to
            ToastService.toast(Messages.message('studentWithoutSpecialization'));
            this.router.navigate(['admin/students/']);
        }

    }

    getAllStudentSpecializations(studentSpecializations: any): void {
        this.specializationService.getAllSpecializations()
            .then((result) => {
                if (result.statusCode == 0) {
                    
                    var allStudentSpecializations = [];
                    $.each(studentSpecializations, function (index, value) {// get all data for specialization assigned with this student
                        $.each(result.data, function (index2, value2) {
                            if (value.specialization_id == value2.specialization_id)
                                allStudentSpecializations.push(value2);
                        })
                    })
                    this.allStudentSpecialization = allStudentSpecializations;

                    this.selectedSpecialization = allStudentSpecializations[0];// set first specialization as default to show the notes
                    this.showNotes();//show notes for selectedSpecialization
                }
            })
            .catch((error) => {
                console.log(error)
            })

    }

    showNotes(): void {
        this.service.setCurrentSpecialization(this.selectedSpecialization);
        this.getAllNotes();
    }
}