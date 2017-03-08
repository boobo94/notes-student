import { Injectable } from '@angular/core';

@Injectable()
export class Messages {
    static msg:any = {
        language: 'english',
        english: {
            //signup
            accoutnAlreadyExists: 'This account already exists.',
            noRegistrationNumber: 'Registration number does not exists.',
            usernameExists: 'This username already exists.',
            signupSuccess: 'Your account was created with success.',

            //login
            loginSuccess: 'You are logged in with success!',
            wrongPassword: "Password are wrong.",
            noUsername: "Username does not exist.",

            //general
            deleteQuestion: 'Are you sure ?',
            updatedWithSuccess: 'Modified with success.',
            deletedWithSuccess: 'Deleted with success.',
            insertedWithSuccess: 'Inserted with success.',
            
        }
    }

    static message(message) {
        return this.msg[this.msg['language']][message]
    }

}