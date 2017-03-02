import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpecializationsComponent } from './specializations.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'specializations',
                component: SpecializationsComponent
            }
        ])
    ]
})
export class SpecializationsRouter {}