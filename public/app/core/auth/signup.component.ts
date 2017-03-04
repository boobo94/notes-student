import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    selector: 'signup',
    template: `<form>
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
                            <input id="username" name="username" type="text" class="validate" class="validate" required="" aria-required="true" [(ngModel)]="user.username">
                            <label for="username">Username</label>
                        </div>
                        <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                            <input id="password" name="password" type="password" class="validate" class="validate" required="" aria-required="true" [(ngModel)]="user.password">
                            <label for="password">Password</label>
                        </div>
                        <div class="col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                            <button class="btn waves-effect waves-light right" type="submit" (click)="signup()">Sign Up
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
                    this.user = {
                        registration_number: this.registrationNumber,
                        level: 3 //level 1 = admin
                                // level 2 = moderator
                               //  level 3 = student
                    }

                    //todo: check if student doesn't have already an account
                    console.log(this.user)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    signup() {
        console.log('sign up press')

        this.service.signup(this.user)
            .then((r) => {
                this.router.navigate(['/login'])
            })
            .catch((error) => {
                
            })
    }
}