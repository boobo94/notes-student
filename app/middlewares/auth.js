import jwt from 'jsonwebtoken';

let config = require('../../config/server-config.json');
config = config[config["environment"]];

export class Auth {

    constructor(config) {
        this.key = config.secret;
    }

    webAuth(req, res, cb) {
        try {
            let token = req.headers.authentification;
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return res.status(200).send("Please enter a valid Token! Error: "+err)
                }
                else {
                    cb();
                }
            })

        } catch (err) {
            return res.status(401).send("Authentification failed. Error: " + err)
        }
    }

}