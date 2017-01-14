import express from 'express';
import bodyParser from 'body-parser';
import { Handler } from '../database/handlers/auth.js'

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

        this.router.post('/login', (req, res) => {
            Handler.login(req.body, (error, result) => {
                if (error)
                    return res.status(500).send(error)
                return res.status(200).send(result)
            })
        })

        this.router.delete('/:id', (req, res) => {
            Handler.delete(req.params.id, (error, result) => {
                if (error)
                    return res.status(500).send(error)
                return res.status(200).send(result)
            })
        })

    }
}