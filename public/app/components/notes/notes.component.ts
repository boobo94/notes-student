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
                <div class="col s12">
                    <button class="btn-floating btn-large waves-effect waves-light red right" (click)="add()"><i class="material-icons">add</i></button>
                </div>
                <table class="bordered">
                    <thead>
                        <tr>
                            <th data-field="id">#</th>
                            <th data-field="name">Notes</th>
                            <th data-field="btns" class="right">Edit/Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr *ngFor="let note of notes">
                            <td>{{note.note_id}}</td>
                            <td>{{note.name}}</td>
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
export class NotesComponent implements OnInit {
    notes: any[]

    constructor(private service: NotesService, private router: Router) {

    }

    ngOnInit(): void {
        this.getAllNotes()
    }

    getAllNotes(): void {
        this.service.getAllNotes()
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
}