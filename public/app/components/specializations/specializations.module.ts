import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';

import { SpecializationsComponent } from './specializations.component';
import { SpecializationsService } from './specializations.service';

@NgModule({
    imports: [
        BrowserModule,
        Http
    ],
    declarations: [
        SpecializationsComponent
    ],
    providers: [
        SpecializationsService
    ]
})
export class SpecializationModule {
    
}