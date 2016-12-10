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

    this.router.get('/add', function (req, res) {
      res.send('add specializationS');

      var spec = {
        name: "romana",
        short_name: "RO"
      }

      Specialization.add(spec);
    })

    this.router.get('/showAll', function (req, res) {
      Specialization.findAll().then(function (results) {//return all specialization when promise returned something
        res.send(results)
      })
    })

    this.router.get('/show/:id', function (req, res) {
      Specialization.findById(req.params.id).then(function (result) {
        res.send(result)
      })
    })

  }
}