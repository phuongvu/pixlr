var express = require('express')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
	, app = express()
	, server = require('http').createServer(app)
	, io = require('socket.io')(server)
  , debug = require('debug')('admin:app')
  , morgan = require('morgan')
  , path = require('path')
  , eddystoneBeacon = require('eddystone-beacon')
  , r = require('rethinkdbdash')()
  , redis = require('redis')
  , Promise = require('bluebird')
  , _ = require('lodash')
  , utils = require('./lib/utils')
  , LedMatrix = require('node-rpi-rgb-led-matrix')
  ;

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

var client = redis.createClient();
var pixels = [];

const webpack = require('webpack')
      , webpackMiddleware = require('webpack-dev-middleware')
      , webpackHotMiddleware = require('webpack-hot-middleware')
      , config = require('./webpack.config.js')
      ;

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;

var d = new Date();

//Preping the LED matrix
var matrix = new LedMatrix(32, 1, 1, 100);

var setMarker = function() {
  var rgb = utils.hexToRgbConverter("#f44336");
  for (var y = 0; y <= 2; y++) {
    for (var x = 0; x <= 2 - y; x++) {
      matrix.setPixel(x, y, rgb.r, rgb.g, rgb.b);
    }
  }
}

setMarker();

// var url = 'http://phuong.vu/?M1X';
var url = 'http://phuong.vu/';
var options = {
  name: 'Beacon',    // set device name when advertising (Linux only)
  txPowerLevel: -100, // override TX Power Level, default value is -21,
  tlmCount: 2,       // 2 TLM frames
  tlmPeriod: 10      // every 10 advertisements
};

eddystoneBeacon.advertiseUrl(url, options);

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'public/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/public'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(morgan('combined'));
}

function draw(coord) {
  var x = coord.x,
      y = coord.y
      color = coord.color;

  debug("coords", coord)

  var rgb;

  if(color === 'rainbow') {
    var t = d.getSeconds();
    rgb = utils.randomRGB(x, y, t);
  } else {
    rgb = utils.hexToRgbConverter(coord.color)
  }

  if(x < 64 && y < 64) {
    matrix.setPixel(x, y, rgb.r, rgb.g, rgb.b);
    matrix.setPixel(x - 1, y, rgb.r, rgb.g, rgb.b);
    matrix.setPixel(x, y - 1, rgb.r, rgb.g, rgb.b);
    matrix.setPixel(x, y + 1, rgb.r, rgb.g, rgb.b);
    matrix.setPixel(x + 1, y, rgb.r, rgb.g, rgb.b);
  }
}

io.on('connection', function(socket) {
  var random = false;

  debug("socket id", socket.client.id, io.engine.clientsCount);

  socket.on('draw', function(coord) {
    pixels.push(coord);
    draw(coord);
  });

  socket.on('reset', function() {
    matrix.clear();
    pixels = [];
    setMarker();
  });

  socket.on('rotate', function(data) {
    matrix.clear();
    matrix.rotate(data.orientation*90);
    setMarker();
    _.map(pixels, function(coord) {
      draw(coord);
    });
  });

  socket.on('press', function(data) {
    console.log("press", data);
  });

  socket.on('doubleTap', function(data) {
    console.log("doubleTap", data);
  });  

  socket.on('swipe', function(data) {
    console.log("swipe", data);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(port, function () {
  debug('Server listening at port %d', port);
});

client.on("error", function (err) {
  console.log("Error " + err);
});

process.on('SIGINT', function () {
  debug('Got SIGINT signal.');
  process.kill(process.pid);
});
