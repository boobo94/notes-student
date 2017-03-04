import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    selector: 'login',
    template: `
                <form #loginform="ngForm">
                    <div class="row">
                        <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                            <input id="username" type="text" name="username" class="validate" required="" aria-required="true" [(ngModel)]="user.username">
                            <label for="username">Username</label>
                        </div>
                        <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                            <input id="password" type="password" name="password" class="validate" required="" aria-required="true" [(ngModel)]="user.password">
                            <label for="password">Password</label>
                        </div>
                        <div class="col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                            <button class="btn waves-effect waves-light right" type="submit" (click)="loginform.form.valid : login() ? null">Submit
                                <i class="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </form>
    `
})
export class LoginComponent {
    user: any = {};

    constructor(private router: Router, private service: AuthService) {

    }

    login(): void {
        this.service.login(this.user)
            .then((r) => {
                if (r.statusCode == 0) { // login with success
                    localStorage.setItem('userToken', r.token);
                    this.router.navigate(['/home'])
                }
                else if (r.statusCode == 4) {
                    //todo: add alert
                    console.log('username or password are wrong')
                }
                else if (r.statusCode == 1) {
                    //todo: add alert
                    console.log('no user was found')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}