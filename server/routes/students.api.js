import express from 'express';
import bodyParser from 'body-parser';
import { Handler } from '../database/handlers/students.js'

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
            function (req, res) {console.log(req.query)
                Handler.getAll(function (error, result) {
                    if (error)
                        return res.status(500).send(error)
                    return res.status(200).send(result)
                })
            })

        this.router.get('/findbyrn/:rn',
            //this.middlewares.auth.webAuth,
            function (req, res) {
                Handler.getOneByRN(req.params.rn,function (error, result) {
                    if (error)
                        return res.status(500).send(error)
                    return res.status(200).send(result)
                })
            })

        this.router.get('/find/:id',
            this.middlewares.auth.webAuth,
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