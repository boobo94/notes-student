import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NotesComponent } from './notes.component';
import { NoteComponent } from './note.component';
import { AuthGuard } from '../../core/auth/auth.guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'admin/notes',
                component: NotesComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'admin/notes/edit',
                component: NoteComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'admin/notes/add',
                component: NoteComponent,
                canActivate: [AuthGuard]
            }
        ])
    ]
})
export class NotesRouter {}