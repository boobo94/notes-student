import express from 'express';
import bodyParser from 'body-parser';
import { Discipline } from '../../database/builders/discipline.js'
import { Handler } from '../../database/handlers/handler.js'

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
            var reqBody = req.body;
            if (!reqBody)
                return res.status(400).send();

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
                .then(function (inserted) {
                    let h = Handler.success();
                    res.send(h)
                })
                .catch(function (error) {
                    let h = Handler.error(error.message);
                    res.send(h)
                })
        })

        this.router.get('/find', function (req, res) {
            Discipline.findAll()
                .then(function (results) {//return all specialization when promise returned something
                    let h;
                    if (results)
                        h = Handler.successJson(results);
                    else
                        h = Handler.error('notfound');

                    res.send(h)           
                })
                .catch(function (error) {
                    let h = Handler.error(error.message);
                    res.send(h)
                })
        })

        this.router.get('/find/:id', function (req, res) {
            Discipline.findById(req.params.id)
                .then(function (result) {
                    let h;
                    if (result && result.dataValues)
                        h = Handler.successJson(result);
                    else
                        h = Handler.error('notfound');
                    
                    res.send(h)
                })
                .catch(function (error) {
                    let h = Handler.error(error.message);
                    res.send(h)
                })
        })

        this.router.put('/:id', function (req, res) {
            var reqBody = req.body;
            if (!reqBody)
                return res.status(400).send();

            var disc = {
                discipline_id: req.params.id,
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
                .then(function (updated) {
                    let h;
                    if (updated == 0)
                        h = Handler.error('notupdated');
                    else
                        h = Handler.success();
                    
                    res.send(h)
                })
                .catch(function (error) {
                    let h = Handler.error(error.message);
                    res.send(h)
                })
        })

        this.router.delete('/:id', function (req, res) {
            Discipline.delete(req.params.id)
                .then(function (affectedRows) {
                    if (!affectedRows){
                        let h = Handler.error('notdeleted');
                        res.send(h)
                    }
                    else{
                        let h = Handler.success();
                        res.send(h)
                    }
                })
                .catch(function (error) {
                        let h = Handler.error(error.message);
                        res.send(h)
                    })

        })

    }
}