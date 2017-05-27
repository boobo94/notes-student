import { Component, AfterViewInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from './../../core/auth/auth.service';

declare var $: any;// declare $ to use jquery

@Component({
    selector: 'navbar',
    template: `
            <nav>
                <div class="nav-wrapper">
                    <a href="#!" class="brand-logo">NS</a>
                    <a href="#" data-activates="mobile" class="button-collapse"><i class="material-icons">menu</i></a>
                    <ul class="right hide-on-med-and-down">
                        <div *ngIf="auth.loggedIn()">
                            <li *ngIf="isAdmin" routerLinkActive="active"><a routerLink="admin/disciplines">Discipline</a></li>
                            <li *ngIf="isAdmin" routerLinkActive="active"><a routerLink="admin/specializations">Specializations</a></li>
                            <li *ngIf="isAdmin" routerLinkActive="active"><a routerLink="admin/students">Students</a></li>
                            <li *ngIf="isAdmin" routerLinkActive="active"><a routerLink="admin/users">Users</a></li>

                            <li *ngIf="!isAdmin" routerLinkActive="active"><a routerLink="my-notes">About Me</a></li>
                            <li routerLinkActive="active"><a routerLink="home">Home</a></li>
                            <li><a (click)="auth.logout()">Log Out</a></li> 
                        </div>
                        <li routerLinkActive="active"><a routerLink="login" *ngIf="!auth.loggedIn()">Log In</a></li>       
                        <li routerLinkActive="active"><a routerLink="signup" *ngIf="!auth.loggedIn()">Sign Up</a></li>       
                    </ul>
                    <ul class="side-nav" id="mobile">
                        <div *ngIf="auth.loggedIn()">
                            <li *ngIf="isAdmin" routerLinkActive="active"><a routerLink="admin/disciplines">Discipline</a></li>
                            <li *ngIf="isAdmin" routerLinkActive="active"><a routerLink="admin/specializations">Specializations</a></li>
                            <li *ngIf="isAdmin" routerLinkActive="active"><a routerLink="admin/students">Students</a></li>
                            <li *ngIf="isAdmin" routerLinkActive="active"><a routerLink="admin/users">Users</a></li>

                            <li  *ngIf="!isAdmin" routerLinkActive="active"><a routerLink="my-notes">About Me</a></li>
                            <li routerLinkActive="active"><a routerLink="home">Home</a></li>
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

    constructor(private auth: AuthService, private router: Router) {
        this.checkIfAdmin()
        this.whenRouteChange()
    }

    ngAfterViewInit() {
        $(document).ready(function () {
            $(".button-collapse").sideNav(); // use navbar collapse in mobile view
        })
    }

    checkIfAdmin(): void {
        if (localStorage.getItem('username')) {
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
        else
            this.isAdmin = false;
    }

    whenRouteChange(): void {
        // check user on server each time
        this.router.events.subscribe(event => {// check when a route is changing
            if (event instanceof NavigationStart) {
                this.checkIfAdmin() // update isAdmin when a route is changing
            }
        });
    }

}