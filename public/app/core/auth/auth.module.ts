import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule} from '@angular/forms';
import { provideAuth } from 'angular2-jwt';

import { LoginComponent } from './login.component';
import { SignUpComponent } from './signup.component';
import { AuthService } from './auth.service';
import { AuthRouter } from './auth.router.module';

import { AuthGuard } from './auth.guard';

import { ToastService } from '../../components/notifications/toast.service';
import { Messages } from '../messages.config';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        AuthRouter
    ],
    declarations: [
        LoginComponent,
        SignUpComponent
    ],
    providers: [
        AuthService,
        AuthGuard,
        ToastService,
        Messages,
        provideAuth({
            headerName: 'X-Auth-Token',//name of my custom header used in api
            headerPrefix: 'Bearer',
            tokenName: 'userToken',
            tokenGetter: (() => localStorage.getItem('userToken')),
            globalHeaders: [{ 'Content-Type': 'application/json' }],
            //noJwtError: true
        })
    ]
})
export class AuthModule {

}