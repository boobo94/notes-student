import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../builders/user.js'
import msg from "./messages.json";

let config = require('../../config/server-config.json');
config = config[config["environment"]];

export class Handler {
    /**
     * @constructor
     * @params {object} middlewares -> shared middlewares for routes
     * @params {object} dependencies -> shared dependencies services (models, builders, etc.)
     */
    constructor() {

    }

    static generateToken(username) {
        var token = jwt.sign({
            sub: username,
        },
            config.secret, {
                expiresIn: "1d"
            })

        return token;
    }

    static login(reqBody, cb) {
        User.findByUsername(reqBody.username) // find in database the user from POST
            .then((user) => {
                if (user) { // if user exists

                    if (bcrypt.compareSync(reqBody.password, user.password)) { // compare the password from db with that from POST
                        var token = this.generateToken(user.username);

                        return cb(null, {
                            token: token,
                            "statusCode": msg.loginsuccess.statusCode,
                            "message": msg.loginsuccess.message
                        })// return token and a successful message
                    }
                    else
                        return cb(null, msg.loginfailed)

                }
                else
                    return cb(null, msg.notfound)
            })
            .catch((error) => {
                return cb(error)
            })
    }

    static signup(reqBody, cb) {
        var usr = {
            username: reqBody.username,
            password: reqBody.password,
            level: reqBody.level,
            registration_number: reqBody.registration_number,
        }

        User.add(usr)
            .then((inserted) => {
                return cb(null, msg.success)
            })
            .catch((error) => {
                return cb(error)
            })
    }

}