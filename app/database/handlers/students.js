import express from 'express';
import { Students } from '../builders/students.js'
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

        var stud = {
            name: reqBody.name,
            tax: reqBody.tax,
            registration_number: reqBody.registration_number,
            specialization_id: reqBody.specialization_id
        }

        Students.add(stud)
            .then(function (inserted) {
                return cb(null, msg.success)
            })
            .catch(function (error) {
                return cb(error)
            })
    }

    static getAll(cb) {
        Students.findAll()
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
        return Students.findById(id)
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

        var stud = {
            student_id: id,
            name: reqBody.name,
            tax: reqBody.tax,
            registration_number: reqBody.registration_number,
            specialization_id: reqBody.specialization_id
        }

        Students.update(stud)
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
        return Students.delete(id)
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