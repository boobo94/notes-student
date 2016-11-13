
var express = require('express'),
  morgan = require('morgan');

var hostname = 'localhost';
var port = 8080;

// create new server
var app = express();

/*
  |--------------------------------------------------
  | Routes
  |--------------------------------------------------
  */

// route for client
var clientRouter = require('./app/routes/client.js');
app.use('/', clientRouter);

// route for admin
var adminRouter = require('./app/routes/admin.js');
app.use('/admin', adminRouter);


/*
  |--------------------------------------------------
  | The static resource
  |--------------------------------------------------
  */

app.use(express.static(__dirname + '/client'));

app.set('views', './client/views');
app.engine('html', require('ejs').renderFile);

/*
  |--------------------------------------------------
  | Start server
  |--------------------------------------------------
  */


app.listen(port, hostname, function () {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});
