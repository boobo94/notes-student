import express from 'express';
import { Note } from '../builders/note.js'
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

        var note = {
            note: reqBody.note,
            exam_date: reqBody.exam_date,
            discipline_id: reqBody.discipline_id,
            student_id: reqBody.student_id,
            specialization_id: reqBody.specialization_id
        }
        Note.add(note)
            .then(function (inserted) {
                return cb(null, msg.success)
            })
            .catch(function (error) {
                return cb(error)
            })
    }

    static getAll(cb) {
        Note.findAll()
            .then(function (results) {
                if (results)
                    return cb(null, {
                        statusCode: msg.success.statusCode,
                        message: msg.success.message,
                        data: results
                    })
                else
                    return cb(null, msg.notfound)
            })
            .catch(function (error) {
                return cb(error)
            })
    }

    static getAllByStudentIDandSpecializationID(ids,cb) {
        Note.findAllByStudentIDandSpecializationID(ids)
            .then(function (results) {
                if (results)
                    return cb(null, {
                        statusCode: msg.success.statusCode,
                        message: msg.success.message,
                        data: results
                    })
                else
                    return cb(null, msg.notfound)
            })
            .catch(function (error) {
                return cb(error)
            })
    }

    static getOne(id, cb) {
        return Note.findById(id)
            .then(function (result) {
                if (result && result.dataValues)
                    return cb(null, {
                        statusCode: msg.success.statusCode,
                        message: msg.success.message,
                        data: result
                    })
                else
                    return cb(null, msg.notfound)
            })
            .catch(function (error) {
                return cb(error)
            })
    }

    static put(reqBody, id, cb) {

        var note = {
            note_id: id,
            note: reqBody.note,
            exam_date: reqBody.exam_date,
            discipline_id: reqBody.discipline_id,
            student_id: reqBody.student_id,
            specialization_id: reqBody.specialization_id
        }

        Note.update(note)
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
        return Note.delete(id)
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