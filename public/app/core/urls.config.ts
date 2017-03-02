import { Injectable } from '@angular/core';

@Injectable()
export class ApiUrls {
    baseApiUrl = 'http://localhost:8080/'

    loginUrl = this.baseApiUrl + 'api/auth/login' //POST
}