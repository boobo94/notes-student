import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DisciplinesComponent } from './disciplines.component';
import { DisciplineComponent } from './discipline.component';
import { AuthGuard } from '../../core/auth/auth.guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'admin/disciplines',
                component: DisciplinesComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'admin/disciplines/edit',
                component: DisciplineComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'admin/disciplines/add',
                component: DisciplineComponent,
                canActivate: [AuthGuard]
            }
        ])
    ]
})
export class DisciplinesRouter {}