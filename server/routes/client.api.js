import express from 'express';

export class Router {
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

        this.router.get('/', function (req, res) {
            res.send('The server is working ...');
        })
    }

    //todo: rename this file with .api
}