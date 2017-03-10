import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserComponent } from './user.component';
import { AuthGuard } from '../../core/auth/auth.guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'admin/users',
                component: UsersComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'admin/users/edit',
                component: UserComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'admin/users/add',
                component: UserComponent,
                canActivate: [AuthGuard]
            }
        ])
    ]
})
export class UsersRouter {}