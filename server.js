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

var path = require("path");
var express = require('express'), multer = require('multer'), app = express(), port = 3000;
app.set('port', port);

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, '/upload/');
  },
  filename: function (request, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
});

app.use(express.static('app/'));

var upload = multer( { dest: 'upload/' } );

app.get('/', function(request, response) {
  response.sendFile('/index.html');
});

app.post( '/upload', upload.single( 'file' ), function( req, res, next ) {
  return res.status(200).send(req.file);
});

var server = app.listen(port, function () {
  console.log('Listening on port ' + server.address().port)
});
