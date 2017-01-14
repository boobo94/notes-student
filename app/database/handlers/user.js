import express from 'express';
import { User } from '../builders/user.js'
import msg from "./messages.json";

export class Handler {
    /**
     * @constructor
     * @params {object} middlewares -> shared middlewares for routes
     * @params {object} dependencies -> shared dependencies services (models, builders, etc.)
     */
    constructor() {

    }

    static post(reqBody, cb) {

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

    static getAll(cb) {
        User.findAll()
            .then((results) => {
                if (results)
                    return cb(null, results)
                else
                    return cb(null, msg.notfound)
            })
            .catch((error) => {
                return cb(error)
            })
    }

    static getOne(id, cb) {
        return User.findById(id)
            .then((result) => {
                if (result && result.dataValues)
                    return cb(null, result)
                else
                    return cb(null, msg.notfound)
            })
            .catch((error) => {
                return cb(error)
            })
    }

    static put(reqBody, id, cb) {

        var usr = {
            user_id: id,
            username: reqBody.username,
            password: reqBody.password,
            level: reqBody.level,
            registration_number: reqBody.registration_number,
        }

        return User.update(usr)
            .then((updated) => {
                if (updated)
                    return cb(null, msg.success)
                else
                    return cb(null, msg.notupdated)
            })
            .catch((error) => {
                return cb(error)
            })
    }

    static delete(id, cb) {
        return User.delete(id)
            .then((affectedRows) => {
                if (affectedRows)
                    return cb(null, msg.success)
                else
                    return cb(null, msg.notdeleted)
            })
            .catch((error) => {
                return cb(error)
            })

    }


}