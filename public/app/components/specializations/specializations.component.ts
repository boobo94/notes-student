import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SpecializationsService } from './specializations.service';

@Component({
    selector: 'specialization-component',
    template: `
    
    `
})
export class SpecializationsComponent implements OnInit {
    specializations: any[]

    constructor( private service: SpecializationsService, private router: Router) {

    }

    ngOnInit(): void {

    }
}