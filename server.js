import express from 'express';
import { Router } from './app/routes/index.router.js'

// create new server
  var app = express();

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

  //var environement = "local";
  let server = require('./config/server-config.json');
      server = server[server["environement"]];

  app.listen(server.port, server.hostname, function () {
    console.log('Server running at http://' + server.hostname + ':' + server.port + '/');
  });
