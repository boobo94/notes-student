import { Injectable } from '@angular/core';

@Injectable()
export class ApiUrls {
    baseApiUrl = 'http://localhost:8080/'

    //auth

    loginUrl = this.baseApiUrl + 'api/auth/login' //POST
    signUpUrl = this.baseApiUrl + 'api/auth/signup' //GET
    
    //users

    getStudentByRN = this.baseApiUrl + 'api/user/findbyrn/' //GET and /:registration_number
    getStudentByUN = this.baseApiUrl + 'api/user/findbyun/' //GET and /:username

    //students

    getStudentByRegistrationNumber = this.baseApiUrl + 'api/student/findbyrn/' //GET and /:registration_number

    //specializations
    getAllSpecializations = this.baseApiUrl + 'api/specialization/find'
}