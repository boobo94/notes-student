import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SpecializationsService } from './specializations.service';

@Component({
    selector: 'specialization-component',
    template: `
    s
    `
})
export class SpecializationsComponent implements OnInit {
    specializations: any[]

    constructor(private service: SpecializationsService, private router: Router) {

    }

    ngOnInit(): void {

    }

    getAllSpecializations(): void {
        this.service.getAllSpecializations()
            .then((r) => {
                this.specializations = r.data;
            })
            .catch((error) => {
                console.log(error)
            })

    }
}