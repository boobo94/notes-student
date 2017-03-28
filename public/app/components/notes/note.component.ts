import { Component, OnInit } from '@angular/core';
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
                        <input id="name" type="text" name="name" class="validate" required="" aria-required="true" [(ngModel)]="note.name">
                        <label [class.active]="note.name" for="name">Name</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input id="short_name" type="text" name="short_name" class="validate" required="" aria-required="true" [(ngModel)]="note.short_name">
                        <label [class.active]="note.short_name" for="short_name">Short name</label>
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
export class NoteComponent implements OnInit {
    note: any
    editMode: Boolean

    constructor(private service: NotesService, private router: Router) {

        this.note = { // create a null object to escape errors in template
            note_id: null,
            name: null,
            short_name: null
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
            this.editMode = false
        }
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
}