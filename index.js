
var http = require('http');

var hostname = 'localhost';
var port = 8080;

// create new server
var server = http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write('Test');
  response.end();
})

server.listen(port, hostname, function () {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});
