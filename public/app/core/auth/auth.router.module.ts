import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { SignUpComponent } from './signup.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'signup',
                component: SignUpComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRouter {
    
}