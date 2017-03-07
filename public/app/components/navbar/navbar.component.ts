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
                            <li *ngIf="isAdmin" routerLinkActive="active"><a routerLink="admin/discipline">Discipline</a></li>
                            <li *ngIf="isAdmin" routerLinkActive="active"><a routerLink="admin/groups">Groups</a></li>
                            <li *ngIf="isAdmin" routerLinkActive="active"><a routerLink="admin/specializations">Specializations</a></li>
                            <li *ngIf="isAdmin" routerLinkActive="active"><a routerLink="admin/students">Students</a></li>
                            <li *ngIf="isAdmin" routerLinkActive="active"><a routerLink="admin/notes">Notes</a></li>

                            <li routerLinkActive="active"><a routerLink="home">Home</a></li>
                            <li routerLinkActive="active"><a routerLink="test">test</a></li>
                            <li><a (click)="auth.logout()">Log Out</a></li> 
                        </div>
                        <li routerLinkActive="active"><a routerLink="login" *ngIf="!auth.loggedIn()">Log In</a></li>       
                        <li routerLinkActive="active"><a routerLink="signup" *ngIf="!auth.loggedIn()">Sign Up</a></li>       
                    </ul>
                    <ul class="side-nav" id="mobile">
                        <div *ngIf="auth.loggedIn()">
                            <li *ngIf="isAdmin" routerLinkActive="active"><a routerLink="admin/discipline">Discipline</a></li>
                            <li *ngIf="isAdmin" routerLinkActive="active"><a routerLink="admin/groups">Groups</a></li>
                            <li *ngIf="isAdmin" routerLinkActive="active"><a routerLink="admin/specializations">Specializations</a></li>
                            <li *ngIf="isAdmin" routerLinkActive="active"><a routerLink="admin/students">Students</a></li>
                            <li *ngIf="isAdmin" routerLinkActive="active"><a routerLink="admin/notes">Notes</a></li>

                            <li routerLinkActive="active"><a routerLink="home">Home</a></li>
                            <li routerLinkActive="active"><a routerLink="test">Test</a></li>
                            <li><a *ngIf="auth.loggedIn()" (click)="auth.logout()">Log Out</a></li>
                        </div>
                        <li routerLinkActive="active"><a routerLink="login" *ngIf="!auth.loggedIn()">Log In</a></li>
                        <li routerLinkActive="active"><a routerLink="signup" *ngIf="!auth.loggedIn()">Sign Up</a></li>
                    </ul>
                </div>
            </nav>
    `
})
export class NavbarComponent implements AfterViewInit {
    isAdmin: any;

    constructor(private auth: AuthService) {
        this.checkIfAdmin()
    }

    ngAfterViewInit() {
        $(document).ready(function () {
            $(".button-collapse").sideNav(); // use navbar collapse in mobile view
        })


    }

    checkIfAdmin(): void {
        this.auth.getUserWithUsername(localStorage.getItem('username'))
            .then((r) => {
                if (r.data.level < 3)
                    this.isAdmin = true
                else
                    this.isAdmin = false
            })
            .catch((error) => {
                console.log(error)
            })
    }

}