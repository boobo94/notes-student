import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { SpecializationsComponent } from './specializations.component';
import { SpecializationComponent } from './specialization.component';
import { SpecializationsService } from './specializations.service';
import { SpecializationsRouter } from './specializations.router.module';
import { AuthGuard } from '../../core/auth/auth.guard';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        SpecializationsRouter
    ],
    declarations: [
        SpecializationsComponent,
        SpecializationComponent
    ],
    providers: [
        SpecializationsService,
        AuthGuard
    ]
})
export class SpecializationsModule {
    
}