import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    selector: 'signup',
    template: `<form #signupform="ngForm">
                <div class="row">
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input [attr.disabled]="user.registration_number" name="registration_number" id="registration_number" type="text" class="validate" required="" aria-required="true" [(ngModel)]="registrationNumber">
                        <label for="registration_number">Registration Number</label>
                    </div>
                    <div *ngIf="!user.registration_number" class="col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <button class="btn waves-effect waves-light right" type="submit" name="action" (click)="checkRegistrationNumber()">Check
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                    <div *ngIf="user.registration_number">
                        <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                            <input id="username" name="username" type="text" class="validate" required="" aria-required="true" [(ngModel)]="user.username">
                            <label for="username">Username</label>
                        </div>
                        <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                            <input id="password" name="password" type="password" class="validate" required="" aria-required="true" [(ngModel)]="user.password">
                            <label for="password">Password</label>
                        </div>
                        <div class="col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                            <button class="btn waves-effect waves-light right" name="action" type="submit" (click)="signupform.form.valid ? signup(): null">Sign Up
                                <i class="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </div></form>
    `
})
export class SignUpComponent {
    user: any = {}
    registrationNumber: any;

    constructor(private router: Router, private service: AuthService) {

    }

    checkRegistrationNumber() {
        if (this.registrationNumber) {

            this.service.getRegistrationNumber(this.registrationNumber)
                .then((r) => {
                    if (r.statusCode == 0) { // registration number is assigned to a student
                        this.service.getUserWithThisRegitrationNumber(this.registrationNumber)
                            .then((r) => {
                                if (r.statusCode == 1) { //student doesn't have an account yet
                                    this.user = {
                                        registration_number: this.registrationNumber,
                                        level: 3 //level 1 = admin
                                        // level 2 = moderator
                                        //  level 3 = student
                                    }
                                }
                                else if (r.statusCode == 0) {
                                    //todo: add an alert, this account already exist
                                    console.log('this account already exists')
                                }
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    }
                    else if (r.statusCode == 1) { // registration number doesn't exist
                        //todo: adda an alert
                        console.log("registration number doesn't exist")
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    signup() {
        if (this.user.registration_number) {
            //check if username is already in user
            //todo: this

            this.service.getUserWithUsername(this.user.username)
                .then((r) => {
                    console.log(r)

                    if (r.statusCode == 1) { // username doesn't exist
                        
                        this.service.signup(this.user)
                            .then((r) => {
                                //todo add an alert with signup success and redirect after n seconds
                                this.router.navigate(['/login'])
                            })
                            .catch((error) => {
                                console.log()
                            })
                    }
                    else if (r.statusCode == 0) {
                        //todo: add alert
                        console.log("this status code already exists")
                    }
                })
                .catch((error) => {
                    console.log()
                })


        }
    }
}