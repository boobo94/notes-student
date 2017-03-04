import { Component, AfterViewInit } from '@angular/core';

import { AuthService } from './../../core/auth/auth.service';

declare var $: any;// declare $ to use jquery

@Component({
    selector: 'navbar',
    template: `
            <nav>
                <div class="nav-wrapper">
                    <a href="#!" class="brand-logo">Logo</a>
                    <a href="#" data-activates="mobile" class="button-collapse"><i class="material-icons">menu</i></a>
                    <ul class="right hide-on-med-and-down">
                        <div *ngIf="auth.loggedIn()">
                            <li routerLinkActive="active"><a routerLink="home">Home</a></li>
                            <li routerLinkActive="active"><a routerLink="test">test</a></li>
                            <li><a (click)="auth.logout()">Log Out</a></li>
                        </div>
                        <li routerLinkActive="active"><a routerLink="login" *ngIf="!auth.loggedIn()">Log In</a></li>       
                    </ul>
                    <ul class="side-nav" id="mobile">
                        <div *ngIf="auth.loggedIn()">
                            <li routerLinkActive="active"><a routerLink="home">Home</a></li>
                            <li routerLinkActive="active"><a routerLink="test">Test</a></li>
                            <li><a *ngIf="auth.loggedIn()" (click)="auth.logout()">Log Out</a></li>
                        </div>
                        <li routerLinkActive="active"><a routerLink="login" *ngIf="!auth.loggedIn()">Log In</a></li>
                    </ul>
                </div>
            </nav>
    `
})
export class NavbarComponent implements AfterViewInit {

    constructor(private auth: AuthService) {

    }

    ngAfterViewInit() {
        $(document).ready(function () {
            $(".button-collapse").sideNav(); // use navbar collapse in mobile view
        })
    }

}