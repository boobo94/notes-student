import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { baseRoute } from './app.router';

//components
import { HomeComponent } from '../components/home/home.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';

//modules
import { ApiUrls } from './urls.config';
import { AuthModule } from './auth/auth.module';
import { SpecializationsModule } from '../components/specializations/specializations.module';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        baseRoute,
        //my modules
        AuthModule,
        SpecializationsModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        FooterComponent
    ],
    providers: [
        ApiUrls,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }