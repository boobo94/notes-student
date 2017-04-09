import { Component } from '@angular/core';

@Component({
    selector: 'notes-students',
    template: `
        <header>
            <navbar></navbar>
        </header>
        <main>
            <router-outlet></router-outlet>
        </main>
        <footer class="page-footer">
            <ftr></ftr>
        </footer>
    `
})
export class AppComponent { }