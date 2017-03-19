import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { StudentsComponent } from './students.component';
import { StudentComponent } from './student.component';
import { StudentsService } from './students.service';
import { SpecializationsService } from '../specializations/specializations.service';
import { GroupsService } from '../groups/groups.service';
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
        StudentComponent
    ],
    providers: [
        StudentsService,
        SpecializationsService,
        GroupsService,
        AuthGuard
    ]
})
export class StudentsModule {
    
}