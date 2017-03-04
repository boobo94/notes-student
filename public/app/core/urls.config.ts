import { Injectable } from '@angular/core';

@Injectable()
export class ApiUrls {
    baseApiUrl = 'http://localhost:8080/'

    loginUrl = this.baseApiUrl + 'api/auth/login' //POST
    signUpUrl = this.baseApiUrl + 'api/auth/signup' //GET

    getStudentByRegistrationNumber = this.baseApiUrl + 'api/student/findbyrn/' //GET and /:registration_number

    getStudentByRN = this.baseApiUrl + 'api/user/findfindbyrn/' //GET and /:registration_number
}