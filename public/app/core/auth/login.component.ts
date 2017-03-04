import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    selector: 'login',
    template: `
                <div class="row">
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input id="username" type="text" class="validate" [(ngModel)]="user.username">
                        <label for="username">Username</label>
                    </div>
                    <div class="input-field col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <input id="password" type="password" class="validate" [(ngModel)]="user.password">
                        <label for="password">Password</label>
                    </div>
                    <div class="col s10 offset-s1 m6 offset-m3 l4 offset-l4">
                        <button class="btn waves-effect waves-light right" type="submit" (click)="login()">Submit
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </div>
    `
})
export class LoginComponent {
    user: any = {};

    constructor(private router: Router, private service: AuthService) {

    }

    login(): void {
        this.service.login(this.user)
            .then((r) => {
                localStorage.setItem('userToken', r.token);
                this.router.navigate(['/home'])
            })
            .catch((error) => {
                console.log(error)
            })
    }
}