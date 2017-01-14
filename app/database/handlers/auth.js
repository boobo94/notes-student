import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../builders/user.js'
import msg from "./messages.json";

let config = require('../../../config/server-config.json');
config = config[config["environment"]];

export class Handler {
    /**
     * @constructor
     * @params {object} middlewares -> shared middlewares for routes
     * @params {object} dependencies -> shared dependencies services (models, builders, etc.)
     */
    constructor() {

    }

    static generateToken() {
        var token = jwt.sign({
            sub: "test",
        },
        config.secret,{
            expiresIn: "1d"
        })

        return token;
    }

    static login(reqBody, cb) {
        User.findByUsername(reqBody.username)
            .then((user) => {
                if (user) {

                    if(bcrypt.compareSync(reqBody.password, user.password)){
                        var token = this.generateToken();


                        return cb(null, {token: token})
                    }
                    else {
                        return cb(null, msg.loginfailed)
                    }



                }
                else
                    return cb(null, msg.notfound)
            })
            .catch((error) => {
                return cb(error)
            })


    }






}