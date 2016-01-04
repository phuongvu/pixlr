var express = require('express')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
	, app = express()
	, server = require('http').createServer(app)
	, mongoose = require('./lib/mongoose.js')
	, io = require('socket.io')(server)
	, fs = require('fs')
  , gm = require('gm').subClass({imageMagick: true})
  , LedMatrix = require('node-rpi-rgb-led-matrix')
  , debug = require('debug')('admin:app')
  , morgan = require('morgan')
  , path = require('path')
  ;

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

mongoose.connect().then(function() {
  server.listen(process.env.PORT || config.server.port, function() {
    debug('express listening at %d', server.address().port);
  });
});

// var matrix = new LedMatrix(32, 4, 1, 100, true);
// while(1) {
// 	matrix.setPixel(63, 63, 250, 200, 50);
// 	matrix.setPixel(0, 0, 0, 255, 100);
// 	matrix.setPixel(0, 63, 255, 255, 255);
// 	matrix.setPixel(63, 0, 255, 0, 0);
// }
