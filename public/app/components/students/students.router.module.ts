import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StudentsComponent } from './students.component';
// import { SpecializationComponent } from './students.component';
import { AuthGuard } from '../../core/auth/auth.guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'admin/students',
                component: StudentsComponent,
                canActivate: [AuthGuard]
            },
            // {
            //     path: 'admin/students/edit',
            //     component: StudentComponent,
            //     canActivate: [AuthGuard]
            // },
            // {
            //     path: 'admin/students/add',
            //     component: StudentComponent,
            //     canActivate: [AuthGuard]
            // }
        ])
    ]
})
export class StudentsRouter {}