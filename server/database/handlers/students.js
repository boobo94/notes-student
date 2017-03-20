import express from 'express';
import { Students } from '../builders/students.js'
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

        var stud = {
            name: reqBody.name,
            tax: reqBody.tax,
            registration_number: reqBody.registration_number,
            specialization_id: reqBody.specialization_id
        }

        Students.add(stud)
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
        Students.findAll()
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

    static getOne(id, cb) {
        return Students.findById(id)
            .then((result) => {
                if (result && result.dataValues)
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

    static getOneByRN(rn, cb) {
        return Students.findByRN(rn)
            .then((result) => {
                if (result && result.dataValues)
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

    static addSpecializationToStudent(stud, cb) {
        return Students.findById(stud.student_id)
            .then((result) => {
                if (result && result.dataValues) {

                    result.addSpecializations(stud.specialization_id)
                        .then((student_specializations) => {
                            return student_specializations
                        })

                    return cb(null, {
                        statusCode: msg.success.statusCode,
                        message: msg.success.message,
                        //data: result
                    })
                }
                else
                    return cb(null, msg.notfound)
            })
            .catch((error) => {
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

        return Students.update(stud)
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
        return Students.delete(id)
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

    static removeSpecializationFromStudent(stud, cb) {
        return Students.findById(stud.student_id)
            .then((result) => {
                if (result && result.dataValues) {

                    result.removeSpecializations(stud.specialization_id) // remove specialization from studentSpecialization table
                        .then((student_specializations) => {
                            //after specializations were removed, remove all groups which belongs to this student
                            return Group.deleteBySpecializationId(stud)
                                .then((affectedRows) => {
                                    if (!affectedRows) {
                                        return false
                                    }
                                    else {
                                        return true
                                    }
                                })
                                .catch((error) => {
                                    return cb(error)
                                })
                            //return student_specializations
                        })

                    return cb(null, {
                        statusCode: msg.success.statusCode,
                        message: msg.success.message,
                        //data: result
                    })
                }
                else
                    return cb(null, msg.notfound)
            })
            .catch((error) => {
                return cb(error)
            })
    }


}