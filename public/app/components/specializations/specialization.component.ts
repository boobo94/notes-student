import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SpecializationsService } from './specializations.service';
import { ToastService } from '../../components/notifications/toast.service';
import { Messages } from '../../core/messages.config';

@Component({
    selector: 'specialization-component',
    template: `
        <div class="container">
            <div class="row">
                <form #specializationform="ngForm">
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input id="specialization_id" type="text" name="specialization_id" class="validate" required="" aria-required="true" [(ngModel)]="specialization.specialization_id">
                        <label [class.active]="specialization.specialization_id" for="specialization_id">Specialization ID</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input id="name" type="text" name="name" class="validate" required="" aria-required="true" [(ngModel)]="specialization.name">
                        <label [class.active]="specialization.name" for="name">Name</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input id="short_name" type="text" name="short_name" class="validate" required="" aria-required="true" [(ngModel)]="specialization.short_name">
                        <label [class.active]="specialization.short_name" for="short_name">Short name</label>
                    </div>
                    <div class="col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <button class="btn waves-effect waves-light right" type="submit" (click)="specializationform.form.valid ? update() : null">Submit
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        `
})
export class SpecializationComponent {
    specialization: any[]

    constructor(private service: SpecializationsService, private router: Router) {
        this.getSpecialization()
        console.log(this.specialization)
    }

    getSpecialization(): void {
        this.specialization = this.service.getCurrentSpecialization();
    }

    update(): void {
        this.service.update(this.specialization)
            .then((r) => {
                console.log(r.statusCode)
                if(r.statusCode == 0) {
                    ToastService.toast(Messages.message()['updatedWithSuccess'])
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}