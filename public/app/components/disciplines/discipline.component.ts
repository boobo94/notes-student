import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DisciplinesService } from './disciplines.service';
import { SpecializationsService } from '../specializations/specializations.service';
import { ToastService } from '../../components/notifications/toast.service';
import { Messages } from '../../core/messages.config';

declare var $: any;// declare $ to use jquery

@Component({
    selector: 'discipline-component',
    template: `
        <div class="container">
            <div class="row">
                <form #disciplineform="ngForm">
                    <div *ngIf="editMode" class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input [disabled]="editMode" id="discipline_id" type="text" name="discipline_id" class="validate" required="" aria-required="true" [(ngModel)]="discipline.discipline_id">
                        <label [class.active]="discipline.discipline_id" for="discipline_id">Discipline ID</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input id="name" type="text" name="name" class="validate" required="" aria-required="true" [(ngModel)]="discipline.name">
                        <label [class.active]="discipline.name" for="name">Name</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input id="short_name" type="text" name="short_name" class="validate" required="" aria-required="true" [(ngModel)]="discipline.short_name">
                        <label [class.active]="discipline.short_name" for="short_name">Short name</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input id="year" type="number" name="year" class="validate" required="" aria-required="true" [(ngModel)]="discipline.year">
                        <label [class.active]="discipline.year" for="year">For Year</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <select id="examination" name="examination" materialize="material_select" [materializeSelectOptions]="selectOptions" [(ngModel)]="discipline.examination">
                            <option value="" disabled selected>Choose your option</option>
                            <option value="colocviu" [selected]="discipline.examination=='colocviu'" >Colocviu</option>
                            <option value="exam" [selected]="discipline.examination=='exam'" >Exam</option>
                            <option value="verification" [selected]="discipline.examination=='verification'" >Verification</option>
                        </select>
                        <label [class.active]="discipline.examination" for="examination">Examination</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input id="credit_points" type="number" name="credit_points" class="validate" required="" aria-required="true" [(ngModel)]="discipline.credit_points">
                        <label [class.active]="discipline.credit_points" for="credit_points">Credit Points</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input id="semester" type="number" name="semester" class="validate" required="" aria-required="true" [(ngModel)]="discipline.semester">
                        <label [class.active]="discipline.semester" for="semester">Semester</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <select id="specialization_id" name="specialization_id" materialize="material_select" [materializeSelectOptions]="selectOptions" [(ngModel)]="discipline.specialization_id">
                            <option value="" disabled >Choose your option</option>
                            <option *ngFor="let specialization of allSpecializations" [selected]="discipline.disciplines[0].specialization_id==specialization.specialization_id" [value]="specialization.specialization_id" >{{specialization.name}}</option>
                        </select>
                        <label [class.active]="discipline.specialization_id" >Specialization</label>
                    </div>
                    <div class="col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <button class="btn waves-effect waves-light right" type="submit" (click)="disciplineform.form.valid ? (editMode ? update() : insert()) : null">Submit
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        `
})
export class DisciplineComponent implements OnInit {
    discipline: any
    editMode: Boolean
    allSpecializations: any[]

    constructor(private service: DisciplinesService, private router: Router, private specService: SpecializationsService) {

        this.discipline = { // create a null object to escape errors in template
            discipline_id: null,
            name: null,
            short_name: null,
            year: null,
            examination: null,
            credit_points: null,
            semester: null,
            specialization_id: null
        }
        this.editMode = false

    }

    ngOnInit() {
        if (this.router.url.indexOf('edit') != -1) {
            this.editMode = true
            let disc: any = this.service.getCurrentDiscipline();

            if (disc != null)
                this.discipline = disc;
            else //if is no more specialization in service [ refresh the page ] redirect
                this.router.navigate(['admin/disciplines'])
        }
        else {
            this.editMode = false
        }
        this.getAllSpecializations();
    }

    update(): void {
        this.service.update(this.discipline)
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
        this.service.insert(this.discipline)
            .then((r) => {
                if (r.statusCode == 0) {
                    ToastService.toast(Messages.message('insertedWithSuccess'))
                    this.router.navigate(['admin/disciplines'])
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getAllSpecializations(): void {
        this.specService.getAllSpecializations()
            .then((result) => {
                this.allSpecializations = result.data;
                Materialize.updateTextFields(); // updateTextFields to move the labels above inputs after data binding
            .catch((error) => {
                console.log(error)
            })

    }
}