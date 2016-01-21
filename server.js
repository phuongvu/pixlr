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
  , eddystoneBeacon = require('eddystone-beacon');
  ;

var SimplexNoise = require('simplex-noise'),
    simplex = new SimplexNoise(Math.random);

var port = process.env.PORT || 80;
var matrix = new LedMatrix(32, 1, 1, 50, false);
var url = 'http://phuong.vu/?M1X';
var options = {
  name: 'Beacon',    // set device name when advertising (Linux only)
  txPowerLevel: -100, // override TX Power Level, default value is -21,
  tlmCount: 2,       // 2 TLM frames
  tlmPeriod: 10      // every 10 advertisements
};

eddystoneBeacon.advertiseUrl(url, options);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));

server.listen(port, function () {
  debug('Server listening at port %d', port);
});

mongoose.connect().then(function() {
  server.listen(process.env.PORT, function() {
    debug('Express listening at %d', server.address().port);
  });
});

var t = 0;

setInterval(function() {
  for (var x = 0; x < 32; x++) {
    for (var y = 0; y < 32; y++) {
      var r = Math.floor(simplex.noise3D(x/8, y/8, t/16) * 255);
      var g = Math.floor(simplex.noise3D(x/16, y/16, t/16) * 255);
      var b = Math.floor(simplex.noise3D(x/32, y/32, t/16) * 255);
      matrix.setPixel(x, y, r, g, b);
    }
  }
  t++;
}, 10);
  


process.on('SIGINT', function () {
  debug('Got SIGINT signal.');
  process.kill(process.pid);
});
