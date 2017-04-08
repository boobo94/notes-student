import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StudentsComponent } from './students.component';
import { StudentComponent } from './student.component';
import { StudentAccountComponent } from './student_account.component';
import { AuthGuard } from '../../core/auth/auth.guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'admin/students',
                component: StudentsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'admin/students/edit',
                component: StudentComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'admin/students/add',
                component: StudentComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'my-notes',
                component: StudentAccountComponent
            }
        ])
    ]
})
export class StudentsRouter {}