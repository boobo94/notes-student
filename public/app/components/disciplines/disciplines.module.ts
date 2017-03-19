import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { DisciplinesComponent } from './disciplines.component';
import { DisciplineComponent } from './discipline.component';
import { DisciplinesService } from './disciplines.service';
import { DisciplinesRouter } from './disciplines.router.module';
import { AuthGuard } from '../../core/auth/auth.guard';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        DisciplinesRouter
    ],
    declarations: [
        DisciplinesComponent,
        DisciplineComponent
    ],
    providers: [
        DisciplinesService,
        AuthGuard
    ]
})
export class DisciplinesModule {
    
}