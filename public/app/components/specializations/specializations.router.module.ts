import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpecializationsComponent } from './specializations.component';
import { SpecializationComponent } from './specialization.component';
import { AuthGuard } from '../../core/auth/auth.guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'admin/specializations',
                component: SpecializationsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'admin/specializations/edit',
                component: SpecializationComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'admin/specializations/add',
                component: SpecializationComponent,
                canActivate: [AuthGuard]
            }
        ])
    ]
})
export class SpecializationsRouter {}