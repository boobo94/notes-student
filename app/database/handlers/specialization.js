import express from 'express';
import { Specialization } from '../builders/specialization.js'
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

        var spec = {
            name: reqBody.name,
            short_name: reqBody.short_name,
        }

        Specialization.add(spec)
            .then(function (inserted) {
                return cb(null, msg.success)
            })
            .catch(function (error) {
                return cb(error)
            })
    }

    static getAll(cb) {
        Specialization.findAll()
            .then(function (results) {
                if (results)
                    return cb(null, results)
                else
                    return cb(null, msg.notfound)
            })
            .catch(function (error) {
                return cb(error)
            })
    }

    static getOne(id, cb) {
        return Specialization.findById(id)
            .then(function (result) {
                if (result && result.dataValues)
                    return cb(null, result)
                else
                    return cb(null, msg.notfound)
            })
            .catch(function (error) {
                return cb(error)
            })
    }

    static put(reqBody, id, cb) {

        var spec = {
            name: reqBody.name,
            short_name: reqBody.short_name,
        }

        Specialization.update(spec)
            .then(function (updated) {
                if (updated == 0)
                    return cb(null, msg.notupdated)
                else
                    return cb(null, msg.success)
            })
            .catch(function (error) {
                return cb(error)
            })
    }

    static delete(id, cb) {
        return Specialization.delete(id)
            .then(function (affectedRows) {
                if (!affectedRows) {
                    return cb(null, msg.notdeleted)
                }
                else {
                    return cb(null, msg.success)
                }
            })
            .catch(function (error) {
                return cb(error)
            })

    }


}