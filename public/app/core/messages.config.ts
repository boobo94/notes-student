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
            wrongPassword: "Password are wrong.",
            noUsername: "Username does not exist.",
        }
    }

    static message():object {
        return this.msg[this.msg['language']]
    }

}