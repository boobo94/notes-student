import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotesService } from './notes.service';
import { ToastService } from '../../components/notifications/toast.service';
import { Messages } from '../../core/messages.config';

@Component({
    selector: 'notes-component',
    template: `
        <div class="container">
            <div class="row">
                <form #noteform="ngForm">
                    <div *ngIf="editMode" class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input [disabled]="editMode" id="note_id" type="text" name="note_id" class="validate" required="" aria-required="true" [(ngModel)]="note.note_id">
                        <label [class.active]="note.note_id" for="note_id">Note ID</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input id="note" type="text" name="note" class="validate" required="" aria-required="true" [(ngModel)]="note.note">
                        <label [class.active]="note.note" for="note">Note</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input id="exam_date" type="text" name="exam_date" materialize="pickadate" [(ngModel)]="note.exam_date">
                        <label [class.active]="note.exam_date" for="exam_date">Exam date</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <select id="specialization_id" name="specialization_id" materialize="material_select" [materializeSelectOptions]="selectOptions" [(ngModel)]="selectedSpecialization">
                            <option value="" disabled >Choose your option</option>
                            <option *ngFor="let specialization of allSpecializations" [value]="specialization.specialization_id" >{{specialization.name}}</option>
                        </select>
                        <label [class.active]="selectedSpecialization" >Specialization</label>
                    </div>
                    <div class="col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <button class="btn waves-effect waves-light right" type="submit" (click)="noteform.form.valid ? (editMode ? update() : insert()) : null">Submit
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        `
})
export class NoteComponent implements OnInit, AfterViewInit {
    note: any
    editMode: Boolean
    student: any
    selectedSpecialization: any
    disciplines: any[]

    constructor(private service: NotesService, private router: Router) {

        this.note = { // create a null object to escape errors in template
            note_id: null,
            note: null,
            exam_date: null,
            discipline_id: null,
            specialization_id: null,
            student_id: null
        }
        this.editMode = false

    }

    ngOnInit() {
        if (this.router.url.indexOf('edit') != -1) {
            this.editMode = true
            let currentNote: any = this.service.getCurrentNote();

            if (currentNote != null)
                this.note = currentNote;
            else //if is no more note in service [ refresh the page ] redirect
                this.router.navigate(['admin/notes'])
        }
        else {
            this.editMode = false;
            this.setStudent();
        }

        this.setSelectedSpecialization();

    }

    ngAfterViewInit() {
        setTimeout(function () {
            Materialize.updateTextFields(); // updateTextFields to move the labels above inputs after data binding
        }, 100);
    }

    update(): void {
        this.service.update(this.note)
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
        this.service.insert(this.note)
            .then((r) => {
                if (r.statusCode == 0) {
                    ToastService.toast(Messages.message('insertedWithSuccess'))
                    this.router.navigate(['admin/notes'])
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    setStudent(): void {
        let currentStudent: any = this.service.getCurrentStudent();

        if (currentStudent) {
            this.student = currentStudent;
            this.note.student_id = currentStudent.student_id; // save student id
        }

    }

    setSelectedSpecialization(): void {
        let currentSpecialization: any = this.service.getCurrentSpecialization();

        if (currentSpecialization) {
            this.selectedSpecialization = currentSpecialization;

            console.log(currentSpecialization)
        //this.getSpecializationDisciplines();
        }

        
    }

    getSpecializationDisciplines(): void {

    }
}