import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule} from '@angular/forms';

import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { AuthRouter } from './auth.router.module';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        AuthRouter
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule {

}