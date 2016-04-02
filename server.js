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
  , redis = require('redis')
  , Promise = require('bluebird')
  , _ = require('lodash')
  , utils = require('./lib/utils')
  , LedMatrix = require('node-rpi-rgb-led-matrix')
  , fs = require('fs')
  , pngparse = require('pngparse')
  ;

var pixels = [];

const webpack = require('webpack')
      , webpackMiddleware = require('webpack-dev-middleware')
      , webpackHotMiddleware = require('webpack-hot-middleware')
      , config = require('./webpack.config.js')
      ;

const isDeveloping = process.env.NODE_ENV === 'development';
const port = 80;

var d = new Date();

//Preping the LED matrix
var matrix = new LedMatrix(32, 4, 1, 100, true);

pngparse.parseFile('icon.jpeg', function(err, data) {
  if(err) {
    console.log("err", err);
    throw err
  }
  console.log(data, 320*320*3);
  matrix.setImageBuffer(data.data, 320, 320);
})

var setMarker = function() {
  var rgb = utils.hexToRgbConverter('#f44336');
  for (var y = 0; y <= 2; y++) {
    for (var x = 0; x <= 2 - y; x++) {
      matrix.setPixel(x, y, rgb.r, rgb.g, rgb.b);
    }
  }
}

// var url = 'http://phuong.vu/?M1X';
var url = 'http://phuong.vu/';
var options = {
  name: 'Beacon',    // set device name when advertising (Linux only)
  txPowerLevel: -100, // override TX Power Level, default value is -21,
  tlmCount: 2,       // 2 TLM frames
  tlmPeriod: 10      // every 10 advertisements
};

// eddystoneBeacon.advertiseUrl(url, options);

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
  debug('coords', coord);

  var x = coord.x,
      y = coord.y
      color = coord.color;

  var rgb = utils.hexToRgbConverter(coord.color)

  if(x < 64 && y < 64) {
    matrix.setPixel(x, y, rgb.r, rgb.g, rgb.b);
  }
}

io.on('connection', function(socket) {
  //Prepare a clean slate
  matrix.clear();
  var random = false;

  debug('socket id', socket.client.id, io.engine.clientsCount);

  pixels.push({id: socket.client.id, coords: []});
  setMarker();

  //Pixels: [{id: "socketId", coords: []}]

  socket.on('draw', function(coord) {
    debug('\nDraw', coord);
    var clientCoords = _.find(pixels, {id: socket.client.id});
    clientCoords.coords.push(coord);
    draw(coord);
  });

  socket.on('reset', function() {
    debug('\nReset', pixels);
    var clientCoords = _.find(pixels, {id: socket.client.id});
    if(!_.isEmpty(clientCoords)) {
      _.map(clientCoords.coords, function(coord) {
        matrix.setPixel(coord.x, coord.y, 0, 0, 0);
      });
      clientCoords.coords = []
    }

    //redraw
    _.map(pixels, function(p) {
      _.map(p.coords, function(coord) {
        draw(coord);
      });
    })
    //set marker
    setMarker();

  });

  socket.on('rotate', function(data) {
    debug('\nRotate', data);
    matrix.clear();
    matrix.rotate(data.orientation*90);
    setMarker();

    _.map(pixels, function(p) {
      _.map(p.coords, function(coord) {
        draw(coord);
      });
    })
  });

  socket.on('press', function(coord) {
    debug('\nPress', coord);

    var clientDrawing = _.find(pixels, {id: socket.client.id});
    clientDrawing.coords.push(coord);

    draw(coord);
  });

  socket.on('disconnect', function(){
    debug('\nUser disconnected');

    //Find client's drawing and remove them
    _.map(_.find(pixels, {id: socket.client.id}).coords, function(coord) {
      matrix.setPixel(coord.x, coord.y, 0, 0, 0);
    });
    //Remove client's drawing from array
    _.remove(pixels, function(item) {
      return item.id === socket.client.id;
    });
    //redraw
    _.map(pixels, function(p) {
      _.map(p.coords, function(coord) {
        draw(coord);
      });
    })
    //set marker
    setMarker();

    debug('disconnected', pixels);

    if (io.engine.clientsCount === 0) {
      debug('Set image');
    }
  });

  socket.on('error', function(e){
    debug('error', e);
  });
});

server.listen(port, function () {
  debug('Server listening at port %d', port);
});

process.on('SIGINT', function () {
  debug('Got SIGINT signal.');
  process.kill(process.pid);
});
