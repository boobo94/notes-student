import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MaterializeModule } from '../../core/materialize.module';
import { UsersComponent } from './users.component';
import { UserComponent } from './user.component';
import { UsersService } from './users.service';
import { UsersRouter } from './users.router.module';
import { AuthGuard } from '../../core/auth/auth.guard';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        UsersRouter,
        MaterializeModule
    ],
    declarations: [
        UsersComponent,
        UserComponent
    ],
    providers: [
        UsersService,
        AuthGuard
    ]
})
export class UsersModule {
    
}