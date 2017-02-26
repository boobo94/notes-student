import { Component, AfterViewInit } from '@angular/core';
declare var $: any;// declare $ to use jquery

@Component({
    selector: 'navbar',
    template: `
            <nav>
                <div class="nav-wrapper">
                    <a href="#!" class="brand-logo">Logo</a>
                    <a href="#" data-activates="mobile" class="button-collapse"><i class="material-icons">menu</i></a>
                    <ul class="right hide-on-med-and-down">
                        <li><a routerLink="home">Home</a></li>
                        <li><a routerLink="test">test</a></li>
                    </ul>
                    <ul class="side-nav" id="mobile">
                        <li><a routerLink="home">Home</a></li>
                        <li><a routerLink="test">Test</a></li>
                    </ul>
                </div>
            </nav>
    `
})
export class NavbarComponent implements AfterViewInit{

    ngAfterViewInit() {
        $(document).ready(function () {
            $(".button-collapse").sideNav(); // use navbar collapse in mobile view
        })
    }

}