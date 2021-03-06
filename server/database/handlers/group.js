import express from 'express';
import { Group } from '../builders/group.js'
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

        var group = {
            name: reqBody.name,
            year: reqBody.year,
            specialization_id: reqBody.specialization_id,
            student_id: reqBody.student_id
        }

        Group.add(group)
            .then((inserted) => {
                return cb(null, {
                    statusCode: msg.success.statusCode,
                    message: msg.success.message,
                    data: inserted
                })
            })
            .catch((error) => {
                return cb(error)
            })
    }

    static getAll(cb) {
        Group.findAll()
            .then((results) => {
                if (results)
                    return cb(null, {
                        statusCode: msg.success.statusCode,
                        message: msg.success.message,
                        data: results
                    })
                else
                    return cb(null, msg.notfound)
            })
            .catch((error) => {
                return cb(error)
            })
    }

    static getAllById(id, queryParams, cb) {
        return Group.findById(id, queryParams)
            .then((result) => {
                if (result)
                    return cb(null, {
                        statusCode: msg.success.statusCode,
                        message: msg.success.message,
                        data: result
                    })
                else
                    return cb(null, msg.notfound)
            })
            .catch((error) => {
                return cb(error)
            })
    }

    static put(reqBody, id, cb) {

        var group = {
            group_id: id,
            name: reqBody.name,
            year: reqBody.year,
            specialization_id: reqBody.specialization_id,
            student_id: reqBody.student_id
        }

        Group.update(group)
            .then((updated) => {
                if (updated == 0)
                    return cb(null, msg.notupdated)
                else
                    return cb(null, msg.success)
            })
            .catch((error) => {
                return cb(error)
            })
    }

    static delete(id, cb) {
        return Group.delete(id)
            .then((affectedRows) => {
                if (!affectedRows) {
                    return cb(null, msg.notdeleted)
                }
                else {
                    return cb(null, msg.success)
                }
            })
            .catch((error) => {
                return cb(error)
            })

    }


}