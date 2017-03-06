import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SpecializationsComponent } from './specializations.component';
import { AuthGuard } from '../../core/auth/auth.guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'admin/specializations',
                component: SpecializationsComponent,
                canActivate: [AuthGuard]
            }
        ])
    ]
})
export class SpecializationsRouter {}