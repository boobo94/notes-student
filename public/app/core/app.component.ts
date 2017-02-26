import { Component } from '@angular/core';

@Component({
    selector: 'notes-students',
    template: `
        <navbar></navbar>
        <router-outlet></router-outlet>
        <ftr></ftr>
    `
})
export class AppComponent { }