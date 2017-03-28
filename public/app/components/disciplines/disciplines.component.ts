import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DisciplinesService } from './disciplines.service';
import { ToastService } from '../../components/notifications/toast.service';
import { Messages } from '../../core/messages.config';

@Component({
    selector: 'disciplines-component',
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
                            <th data-field="name">Discipline</th>
                            <th data-field="btns" class="right">Edit/Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr *ngFor="let disc of disciplines">
                            <td>{{disc.discipline_id}}</td>
                            <td>{{disc.name}}</td>
                            <td class="right">
                                <button (click)="edit(disc)" class="waves-effect waves-light btn "><i class="material-icons">mode_edit</i></button>
                                <button (click)="delete(disc.discipline_id)" class="waves-effect waves-light btn "><i class="material-icons">delete</i></button>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    `
})
export class DisciplinesComponent implements OnInit {
    disciplines: any[]

    constructor(private service: DisciplinesService, private router: Router) {

    }

    ngOnInit(): void {
        this.getAllDisciplines()
    }

    getAllDisciplines(): void {
        this.service.getAllDisciplines()
            .then((r) => {
                this.disciplines = r.data;
            })
            .catch((error) => {
                console.log(error)
            })

    }

    add(): void {
        this.router.navigate(['admin/disciplines/add'])
    }

    edit(discipline: any): void {
        this.service.setCurrentDiscipline(discipline)
        this.router.navigate(['admin/disciplines/edit'])
    }

    delete(id: Number): void {
        var areSure = confirm(Messages.message('deleteQuestion'))

        if (areSure) {
            this.service.delete(id)
                .then((r) => {
                    if (r.statusCode == 0) {
                        ToastService.toast(Messages.message('deletedWithSuccess'))
                        this.getAllDisciplines() // reload all disciplines
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }
}