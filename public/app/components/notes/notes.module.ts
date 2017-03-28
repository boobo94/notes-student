import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { NotesComponent } from './notes.component';
import { NoteComponent } from './note.component';
import { NotesService } from './notes.service';
import { NotesRouter } from './notes.router.module';
import { AuthGuard } from '../../core/auth/auth.guard';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        NotesRouter
    ],
    declarations: [
        NotesComponent,
        NoteComponent
    ],
    providers: [
        NotesService,
        AuthGuard
    ]
})
export class NotesModule {
    
}