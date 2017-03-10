import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from './users.service';
import { ToastService } from '../../components/notifications/toast.service';
import { Messages } from '../../core/messages.config';

@Component({
    selector: 'users-component',
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
                            <th data-field="username">Username</th>
                            <th data-field="registration_number">Registration Number</th>
                            <th data-field="btns" class="right">Edit/Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr *ngFor="let usr of users">
                            <td>{{usr.user_id}}</td>
                            <td>{{usr.username}}</td>
                            <td>{{usr.registration_number}}</td>
                            <td class="right">
                                <button (click)="edit(usr)" class="waves-effect waves-light btn "><i class="material-icons">mode_edit</i></button>
                                <button (click)="delete(usr.user_id)" class="waves-effect waves-light btn "><i class="material-icons">delete</i></button>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    `
})
export class UsersComponent implements OnInit {
    users: any[]

    constructor(private service: UsersService, private router: Router) {

    }

    ngOnInit(): void {
        this.getAllUsers()
    }

    getAllUsers(): void {
        this.service.getAllUsers()
            .then((r) => {
                this.users = r.data;
            })
            .catch((error) => {
                console.log(error)
            })

    }

    add(): void {
        this.router.navigate(['admin/users/add'])
    }

    edit(user: any): void {
        this.service.setCurrentUser(user)
        this.router.navigate(['admin/users/edit'])
    }

    delete(id: Number): void {
        var areSure = confirm(Messages.message('deleteQuestion'))

        if (areSure) {
            this.service.delete(id)
                .then((r) => {
                    if (r.statusCode == 0) {
                        ToastService.toast(Messages.message('deletedWithSuccess'))
                        this.getAllUsers() // reload all users
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }
}