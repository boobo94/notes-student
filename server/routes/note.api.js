import express from 'express';
import bodyParser from 'body-parser';
import { Note } from '../database/builders/note.js'
import { Handler } from '../database/handlers/note.js'

export class Api {
    /**
     * @constructor
     * @params {object} middlewares -> shared middlewares for routes
     * @params {object} dependencies -> shared dependencies services (models, builders, etc.)
     */
    constructor(middlewares, dependencies) {
        this.middlewares = middlewares
        this.dependencies = dependencies

        //create new Router
        this.router = express.Router()

        this.router.post('/',
            this.middlewares.auth.webAuth,
            this.middlewares.auth.adminAuth,
            function (req, res) {
                Handler.post(req.body, function (error, result) {
                    if (error)
                        return res.status(500).send(error)
                    return res.status(200).send(result)
                })
            })

        this.router.get('/find',
            this.middlewares.auth.webAuth,
            function (req, res) {
                Handler.getAll(req.query, function (error, result) {
                    if (error)
                        return res.status(500).send(error)
                    return res.status(200).send(result)
                })
            })

        this.router.get('/findByStudentId/:studentid/:specializationid',
            this.middlewares.auth.webAuth,
            function (req, res) {
                var noteIDS = {
                    student_id: req.params.studentid,
                    specialization_id: req.params.specializationid
                }
                Handler.getAllByStudentIDandSpecializationID(noteIDS, function (error, result) {
                    if (error)
                        return res.status(500).send(error)
                    return res.status(200).send(result)
                })
            })

        this.router.get('/find/:id',
            this.middlewares.auth.webAuth,
            this.middlewares.auth.adminAuth,
            function (req, res) {
                Handler.getOne(req.params.id, function (error, result) {
                    if (error)
                        return res.status(500).send(error)
                    return res.status(200).send(result)
                })
            })

        this.router.put('/:id',
            this.middlewares.auth.webAuth,
            this.middlewares.auth.adminAuth,
            function (req, res) {
                Handler.put(req.body, req.params.id, function (error, result) {
                    if (error)
                        return res.status(500).send(error)
                    return res.status(200).send(result)
                })
            })

        this.router.delete('/:id',
            this.middlewares.auth.webAuth,
            this.middlewares.auth.adminAuth,
            function (req, res) {
                Handler.delete(req.params.id, function (error, result) {
                    if (error)
                        return res.status(500).send(error)
                    return res.status(200).send(result)
                })
            })

    }
}