
var express = require('express'),
    morgan = require('morgan');

var hostname = 'localhost';
var port = 8080;

// create new server
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function () {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});
