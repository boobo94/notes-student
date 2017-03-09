import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { StudentsComponent } from './students.component';
// import { StudentComponent } from './specialization.component';
import { StudentsService } from './students.service';
import { StudentsRouter } from './students.router.module';
import { AuthGuard } from '../../core/auth/auth.guard';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        StudentsRouter
    ],
    declarations: [
        StudentsComponent,
        // StudentComponent
    ],
    providers: [
        StudentsService,
        AuthGuard
    ]
})
export class StudentsModule {
    
}