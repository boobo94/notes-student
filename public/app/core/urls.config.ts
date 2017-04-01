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
    getStudents             = this.baseApiUrl + 'api/student/find/' //GET and /:student_id
    updateStudents          = this.baseApiUrl + 'api/student/' //PUT and /:student_id
    deleteStudents          = this.baseApiUrl + 'api/student/' //DELETE and /:student_id
    insertStudents          = this.baseApiUrl + 'api/student/' //POST and /:student_id
    addSpecializationToStudent          = this.baseApiUrl + 'api/student/add-specializations/' //POST
    removeSpecializationFromStudent     = this.baseApiUrl + 'api/student/remove-specializations/' //POST and /:student_id

    //disciplines
    getAllDisciplines       = this.baseApiUrl + 'api/discipline/find' //GET
    getDisciplines          = this.baseApiUrl + 'api/discipline/find/' //GET and /:discipline_id
    updateDisciplines       = this.baseApiUrl + 'api/discipline/' //PUT and /:discipline_id
    deleteDisciplines       = this.baseApiUrl + 'api/discipline/' //DELETE and /:discipline_id
    insertDisciplines       = this.baseApiUrl + 'api/discipline/' //POST and /:discipline_id

    //users
    getAllUsers             = this.baseApiUrl + 'api/user/find' //GET
    getUsers                = this.baseApiUrl + 'api/user/find/' //GET and /:user_id
    updateUsers             = this.baseApiUrl + 'api/user/' //PUT and /:user_id
    deleteUsers             = this.baseApiUrl + 'api/user/' //DELETE and /:user_id
    insertUsers             = this.baseApiUrl + 'api/user/' //POST and /:user_id

    //groups
    getAllGroups            = this.baseApiUrl + 'api/group/find' //GET
    getGroup                = this.baseApiUrl + 'api/group/find/' //GET and /:student_id
    updateGroups            = this.baseApiUrl + 'api/group/' //PUT and /:group_id
    deleteGroups            = this.baseApiUrl + 'api/group/' //DELETE and /:group_id
    insertGroups            = this.baseApiUrl + 'api/group/' //POST and /:group_id

    //notes
    getAllNotes             = this.baseApiUrl + 'api/note/find' //GET
    getNote                 = this.baseApiUrl + 'api/note/find/' //GET and /:note_id
    updateNote              = this.baseApiUrl + 'api/note/' //PUT and /:note_id
    deleteNote              = this.baseApiUrl + 'api/note/' //DELETE and /:note_id
    insertNote              = this.baseApiUrl + 'api/note/' //POST and /:note_id
}