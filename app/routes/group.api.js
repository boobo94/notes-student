import express from 'express';
import bodyParser from 'body-parser';
import { Handler } from '../database/handlers/group.js'

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

        this.router.post('/add', function (req, res) {
            Handler.post(req.body, function (error, result) {
                if (error)
                    return res.status(500).send(error)
                return res.status(200).send(result)
            })
        })

        this.router.get('/find', function (req, res) {
            Handler.getAll(function (error, result) {
                if (error)
                    return res.status(500).send(error)
                return res.status(200).send(result)
            })
        })

        this.router.get('/find/:id', function (req, res) {
            Handler.getOne(req.params.id, function (error, result) {
                if (error)
                    return res.status(500).send(error)
                return res.status(200).send(result)
            })
        })

        this.router.put('/:id', function (req, res) {
            Handler.put(req.body, req.params.id, function (error, result) {
                if (error)
                    return res.status(500).send(error)
                return res.status(200).send(result)
            })
        })

        this.router.delete('/:id', function (req, res) {
            Handler.delete(req.params.id, function (error, result) {
                if (error)
                    return res.status(500).send(error)
                return res.status(200).send(result)
            })
        })

    }
}