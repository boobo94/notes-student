import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './core/app.module';
import { enableProdMode } from '@angular/core';
enableProdMode();
// run in browser
platformBrowserDynamic().bootstrapModule(AppModule)
    .then(function (success) {
        return console.log('Loading with sucess!')
    })
    .catch(function (error) {
        return console.log(error);
    })