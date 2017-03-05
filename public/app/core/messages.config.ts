import { Injectable } from '@angular/core';

@Injectable()
export class Messages {
    static msg:any = {
        language: 'english',
        english: {
            accoutnAlreadyExists: 'This account already exists.',
            noRegistrationNumber: 'Registration number does not exists.',
            usernameExists: 'This username already exists.'
        }
    }

    static message():object {
        return this.msg[this.msg['language']]
    }

}