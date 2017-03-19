import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DisciplinesService } from './disciplines.service';
import { ToastService } from '../../components/notifications/toast.service';
import { Messages } from '../../core/messages.config';

@Component({
    selector: 'discipline-component',
    template: `
        <div class="container">
            <div class="row">
                <form #disciplineform="ngForm">
                    <div *ngIf="editMode" class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input [disabled]="editMode" id="discipline_id" type="text" name="discipline_id" class="validate" required="" aria-required="true" [(ngModel)]="discipline.specialization_id">
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

    constructor(private service: DisciplinesService, private router: Router) {

        this.discipline = { // create a null object to escape errors in template
            discipline_id: null,
            name: null,
            short_name: null
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
                    this.router.navigate(['admin/specializations'])
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}