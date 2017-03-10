import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from './users.service';
import { ToastService } from '../../components/notifications/toast.service';
import { Messages } from '../../core/messages.config';

@Component({
    selector: 'user-component',
    template: `
        <div class="container">
            <div class="row">
                <form #userform="ngForm">
                    <div *ngIf="editMode" class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input [disabled]="editMode" id="user_id" type="text" name="user_id" class="validate" required="" aria-required="true" [(ngModel)]="user.user_id">
                        <label [class.active]="user.user_id" for="user_id">User ID</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input id="username" type="text" name="username" class="validate" required="" aria-required="true" [(ngModel)]="user.username">
                        <label [class.active]="user.username" for="username">Username</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input id="level" type="text" name="level" class="validate" required="" aria-required="true" [(ngModel)]="user.level">
                        <label [class.active]="user.level" for="level">Level</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input id="registration_number" type="text" name="registration_number" class="validate" required="" aria-required="true" [(ngModel)]="user.registration_number">
                        <label [class.active]="user.registration_number" for="registration_number">Registration Number</label>
                    </div>
                    <div class="col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <button class="btn waves-effect waves-light right" type="submit" (click)="userform.form.valid ? (editMode ? update() : insert()) : null">Submit
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        `
})
export class UserComponent implements OnInit {
    user: any
    editMode: Boolean

    constructor(private service: UsersService, private router: Router) {

        this.user = { // create a null object to escape errors in template
            user_id: null,
            username: null,
            level: null,
            registration_number: null,
        }
        this.editMode = false

    }

    ngOnInit() {
        if (this.router.url.indexOf('edit') != -1) {
            this.editMode = true
            let spec: any = this.service.getCurrentUser();

            if (spec != null)
                this.user = spec;
            else //if is no more user in service [ refresh the page ] redirect
                this.router.navigate(['admin/users'])
        }
        else {
            this.editMode = false
        }
    }

    update(): void {
        this.service.update(this.user)
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
        this.service.insert(this.user)
            .then((r) => {
                if (r.statusCode == 0) {
                    ToastService.toast(Messages.message('insertedWithSuccess'))
                    this.router.navigate(['admin/users'])
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}