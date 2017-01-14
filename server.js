import express from 'express';
import bodyParser from 'body-parser';
import { Router } from './app/routes/index.router.js';

let config = require('./config/server-config.json');
    config = config[config["environment"]];

/**
  |--------------------------------------------------
  | Create Server using Express
  |--------------------------------------------------
  */

    var app = express();

    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/**
  |--------------------------------------------------
  | Routes
  |--------------------------------------------------
  */

    var api = new Router(config);
    api.configure(app);

/**
  |--------------------------------------------------
  | The static resource
  |--------------------------------------------------
  */

    app.use(express.static(__dirname + '/client'));

    app.set('views', './client/views');
    app.engine('html', require('ejs').renderFile);

/**
  |--------------------------------------------------
  | Database
  |--------------------------------------------------
  */

    function initDB() {
      let models = require('./app/database/models');

      models.sequelize.sync().then(function () {
        console.log('Models was synced!');
      });
    }

  //initDB();

/**
  |--------------------------------------------------
  | Server
  |--------------------------------------------------
  */

    app.listen(config.port, config.hostname, function () {
      console.log('Server running at http://' + config.hostname + ':' + config.port + '/');
    });
