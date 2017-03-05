import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule} from '@angular/forms';

import { LoginComponent } from './login.component';
import { SignUpComponent } from './signup.component';
import { AuthService } from './auth.service';
import { AuthRouter } from './auth.router.module';

import { AuthGuard } from './auth.guard';

import { ToastService } from '../../components/notifications/toast.service'

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
        ToastService
    ]
})
export class AuthModule {

}