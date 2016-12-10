import express from 'express';
import bodyParser from 'body-parser';
import { Router } from './app/routes/index.router.js'

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

    var api = new Router();
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

    let server = require('./config/server-config.json');
        server = server[server["environment"]];

    app.listen(server.port, server.hostname, function () {
      console.log('Server running at http://' + server.hostname + ':' + server.port + '/');
    });
