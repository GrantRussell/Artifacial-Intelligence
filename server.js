const http = require('http');
const serveStatic = require('serve-static');
const finalhandler = require('finalhandler');

var serve = serveStatic('app/', {'index': ['index.html', 'index.htm']});

var server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res))
});

console.log("Listening on 3000");

// Listen
server.listen(3000);
