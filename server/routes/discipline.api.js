import express from 'express';
import bodyParser from 'body-parser';
import { Handler } from '../database/handlers/discipline.js'

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
            (req, res) => {
                Handler.post(req.body, (error, result) => {
                    if (error)
                        return res.status(500).send(error)
                    return res.status(200).send(result)
                })
            })

        this.router.get('/find',
            this.middlewares.auth.webAuth,
            this.middlewares.auth.adminAuth,
            (req, res) => {
                Handler.getAll((error, result) => {
                    if (error)
                        return res.status(500).send(error)
                    return res.status(200).send(result)
                })
            })

        this.router.get('/find/:id',
            this.middlewares.auth.webAuth,
            this.middlewares.auth.adminAuth,
            (req, res) => {
                Handler.getOne(req.params.id, (error, result) => {
                    if (error)
                        return res.status(500).send(error)
                    return res.status(200).send(result)
                })
            })

        this.router.get('/findBySpecialization/:id',
            this.middlewares.auth.webAuth,
            this.middlewares.auth.adminAuth,
            (req, res) => {
                Handler.getAllBySpecializationID(req.params.id, (error, result) => {
                    if (error)
                        return res.status(500).send(error)
                    return res.status(200).send(result)
                })
            })

        this.router.put('/:id',
            this.middlewares.auth.webAuth,
            this.middlewares.auth.adminAuth,
            (req, res) => {
                Handler.put(req.body, req.params.id, (error, result) => {
                    if (error)
                        return res.status(500).send(error)
                    return res.status(200).send(result)
                })
            })

        this.router.delete('/:id',
            this.middlewares.auth.webAuth,
            this.middlewares.auth.adminAuth,
            (req, res) => {
                Handler.delete(req.params.id, (error, result) => {
                    if (error)
                        return res.status(500).send(error)
                    return res.status(200).send(result)
                })
            })

    }
}