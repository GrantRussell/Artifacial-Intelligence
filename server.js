// const http = require('http');
// const serveStatic = require('serve-static');
// const finalhandler = require('finalhandler');
//
// var serve = serveStatic('app/', {'index': ['index.html', 'index.htm']});
//
// var server = http.createServer(function onRequest (req, res) {
//   serve(req, res, finalhandler(req, res))
// });
//
// console.log("Listening on 3000");
//
// // Listen
// server.listen(3000);

const artifacial = require('./artificial');
var path = require("path");
var express = require('express'), multer = require('multer'), app = express(), port = 3000;
app.set('port', port);

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, './upload/');
  },
  filename: function (request, file, cb) {
      cb(null, Date.now() + '.jpg');
  }
});

app.use(express.static('app/'));

var upload = multer( { storage : storage } );

app.get('/', function(request, response) {
  response.sendFile('/index.html');
});

app.post( '/upload', upload.single('file'), function( req, res, next ) {
  var value = res.status(200).send(req.file);
  var url;
  artifacial.masterFunction(value.req.file.destination + value.req.file.filename, (urlVal) =>{
      url = urlVal;
      console.log(url);
  });
  return value;
});

var server = app.listen(port, function () {
  console.log('Listening on port ' + server.address().port)
});
