import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { SpecializationsComponent } from './specializations.component';
import { SpecializationsService } from './specializations.service';
import { SpecializationsRouter } from './specializations.router.module';
import { AuthGuard } from '../../core/auth/auth.guard';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        SpecializationsRouter
    ],
    declarations: [
        SpecializationsComponent
    ],
    providers: [
        SpecializationsService,
        AuthGuard
    ]
})
export class SpecializationsModule {
    
}