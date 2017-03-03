import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Router } from './routes/index.router.js';

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
  | Cors Access
  |--------------------------------------------------
  */

    app.use(cors());
/**
  |--------------------------------------------------
  | Routes
  |--------------------------------------------------
  */

    var api = new Router(config);
    api.configure(app);

/**
  |--------------------------------------------------
  | Database
  |--------------------------------------------------
  */

    function initDB() {
      let models = require('./database/models');

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
