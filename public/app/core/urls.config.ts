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

    //specializations
    getAllSpecializations   = this.baseApiUrl + 'api/specialization/find' //GET
    getSpecialization       = this.baseApiUrl + 'api/specialization/find/' //GET and /:specialization_id
    updateSpecialization    = this.baseApiUrl + 'api/specialization/' //PUT and /:specialization_id
    deleteSpecialization    = this.baseApiUrl + 'api/specialization/' //DELETE and /:specialization_id
    insertSpecialization    = this.baseApiUrl + 'api/specialization/' //POST and /:specialization_id

    //students
    getStudentByRegistrationNumber = this.baseApiUrl + 'api/student/findbyrn/' //GET and /:registration_number
    getAllStudents          = this.baseApiUrl + 'api/student/find' //GET
    getStudents             = this.baseApiUrl + 'api/student/find/' //GET and /:sstudent_id
    updateStudents          = this.baseApiUrl + 'api/student/' //PUT and /:student_id
    deleteStudents          = this.baseApiUrl + 'api/student/' //DELETE and /:student_id
    insertStudents          = this.baseApiUrl + 'api/student/' //POST and /:student_id
}