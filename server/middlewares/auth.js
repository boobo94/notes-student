import jwt from 'jsonwebtoken';

import msg from '../database/handlers/messages.json';

let config = require('../config/server-config.json');
config = config[config["environment"]];

export class Auth {

    constructor(config) {
        this.key = config.secret;
    }

    webAuth(req, res, cb) {
        try {
            let token = req.headers['x-auth-token'].split(' ')[1]; // get token from header x-auth-token
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return res.status(200).send({
                        message: msg.invalidToken.message,
                        statusCode: msg.invalidToken.statusCode,
                        error: err
                    })
                }
                else {
                    cb();
                }
            })

        } catch (err) {
            return res.status(401).send({
                message: msg.authFailed.message,
                statusCode: msg.authFailed.statusCode,
                error: err
            })
        }
    }


    //todo: add middlewares in routes in methods that require this, with priority post,put,delete

    /**
     * Is used to check authorization for users.
     * If user is student (has level 3) then return 403, else allow access
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {function} cb 
     */

    adminAuth(req, res, cb) {
        try {
            let token = req.headers['x-auth-token'].split(' ')[1]; // get token from header x-auth-token
            var decoded = jwt.decode(token, { complete: true });

            if (decoded.header.userLevel < 3)
                cb();
            else
                return res.status(403).send(msg.notAuthorized)


        } catch (err) {
            return res.status(401).send({
                message: msg.authFailed.message,
                statusCode: msg.authFailed.statusCode,
                error: err
            })
        }
    }

}