import express from 'express';
import { Discipline } from '../builders/discipline.js'
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

        var disc = {
            name: reqBody.name,
            short_name: reqBody.short_name,
            type: reqBody.type,
            year: reqBody.year,
            examination: reqBody.examination,
            credit_points: reqBody.credit_points,
            semester: reqBody.semester,
            specialization_id: reqBody.specialization_id
        }

        Discipline.add(disc)
            .then((inserted) => {
                return cb(null, msg.success)
            })
            .catch((error) => {
                return cb(error)
            })
    }

    static getAll(cb) {
        Discipline.findAll()
            .then((results) => {
                if (results)
                    return cb(null, {
                        statusCode: msg.success.statusCode,
                        data: results
                    })
                else
                    return cb(null, msg.notfound)
            })
            .catch((error) => {
                return cb(error)
            })
    }

    static getOne(id, cb) {
        return Discipline.findById(id)
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

        var disc = {
            discipline_id: id,
            name: reqBody.name,
            short_name: reqBody.short_name,
            type: reqBody.type,
            year: reqBody.year,
            examination: reqBody.examination,
            credit_points: reqBody.credit_points,
            semester: reqBody.semester,
            specialization_id: reqBody.specialization_id
        }

        Discipline.update(disc)
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
        return Discipline.delete(id)
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