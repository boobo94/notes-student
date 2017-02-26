import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { baseRoute } from './app.router';

//components
import { HomeComponent } from '../components/home/home.component';
import { NavbarComponent} from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        baseRoute
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        FooterComponent
        ],
    bootstrap: [AppComponent]
})
export class AppModule { }