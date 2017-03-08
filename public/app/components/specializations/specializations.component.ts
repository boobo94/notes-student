import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SpecializationsService } from './specializations.service';
import { ToastService } from '../../components/notifications/toast.service';
import { Messages } from '../../core/messages.config';

@Component({
    selector: 'specialization-component',
    template: `
        <div class="container">
            <div class="row">
                <table class="bordered">
                    <thead>
                        <tr>
                            <th data-field="id">#</th>
                            <th data-field="name">Specializations</th>
                            <th data-field="btns" class="right">Edit/Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr *ngFor="let spec of specializations">
                            <td>{{spec.specialization_id}}</td>
                            <td>{{spec.name}}</td>
                            <td class="right">
                                <button (click)="edit(spec)" class="waves-effect waves-light btn "><i class="material-icons">mode_edit</i></button>
                                <button (click)="delete(spec.specialization_id)" class="waves-effect waves-light btn "><i class="material-icons">delete</i></button>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    `
})
export class SpecializationsComponent implements OnInit {
    specializations: any[]

    constructor(private service: SpecializationsService, private router: Router) {

    }

    ngOnInit(): void {
        this.getAllSpecializations()
    }

    getAllSpecializations(): void {
        this.service.getAllSpecializations()
            .then((r) => {
                this.specializations = r.data;
            })
            .catch((error) => {
                console.log(error)
            })

    }

    edit(specialization: any): void {
        this.service.setCurrentSpecialization(specialization)
        this.router.navigate(['admin/specializations/edit'])
    }

    delete(id: Number): void {
        var areSure = confirm(Messages.message('deleteQuestion'))

        if (areSure) {
            this.service.delete(id)
                .then((r) => {
                    if (r.statusCode == 0) {
                        ToastService.toast(Messages.message('deletedWithSuccess'))
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }
}