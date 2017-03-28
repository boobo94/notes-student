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
import { MaterializeModule } from './materialize.module'
import { ApiUrls } from './urls.config';
import { AuthModule } from './auth/auth.module';
import { SpecializationsModule } from '../components/specializations/specializations.module';
import { StudentsModule } from '../components/students/students.module';
import { DisciplinesModule } from '../components/disciplines/disciplines.module';
import { UsersModule } from '../components/users/users.module';
import { NotesModule } from '../components/notes/notes.module';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        baseRoute,
        //my modules
        MaterializeModule,
        AuthModule,
        SpecializationsModule,
        StudentsModule,
        DisciplinesModule,
        UsersModule,
        NotesModule,
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