import express from 'express';
import { Specialization } from '../../database/builders/specialization.js'

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

    this.router.get('/', function (req, res) {
      res.send('spec api');
    })

    this.router.post('/add', function (req, res) {
      var reqBody = req.body;
      if (!reqBody)
        return res.status(500).send({ 'message': 'error' });
      var spec = {
        name: reqBody.name,
        short_name: reqBody.short_name
      }

      Specialization.add(spec);
      res.send({ 'message': 'success' })
    })

    this.router.get('/find', function (req, res) {
      Specialization.findAll().then(function (results) {//return all specialization when promise returned something
        res.send(results)
      })
    })

    this.router.get('/find/:id', function (req, res) {
      Specialization.findById(req.params.id).then(function (result) {
        res.send(result)
      })
    })

    this.router.put('/:id', function (req, res) {
      var reqBody = req.body;
      var spec = {
        specialization_id: req.params.id,
        name: reqBody.name,
        short_name: reqBody.short_name
      }
      Specialization.update(spec)
      res.send({ 'message': 'success' })
    })

    this.router.delete('/:id', function (req, res) {
      Specialization.delete(req.params.id).then(function (affectedRows) {
        if (!affectedRows)
          res.status(500).send({ 'message': 'error' })
        else
          res.send({ 'message': 'success' })
      })

    })

  }
}