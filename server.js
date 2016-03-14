var express = require('express')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
	, app = express()
	, server = require('http').createServer(app)
	, mongoose = require('./lib/mongoose.js')
	, io = require('socket.io')(server)
  , gm = require('gm').subClass({imageMagick: true})
  , LedMatrix = require('node-rpi-rgb-led-matrix')
  , debug = require('debug')('admin:app')
  , morgan = require('morgan')
  , path = require('path')
  , eddystoneBeacon = require('eddystone-beacon')
  , r = require('rethinkdbdash')()
  ;

const webpack = require('webpack')
      , webpackMiddleware = require('webpack-dev-middleware')
      , webpackHotMiddleware = require('webpack-hot-middleware')
      , config = require('./webpack.config.js')
      ;

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;

var SimplexNoise = require('simplex-noise'),
    simplex = new SimplexNoise(Math.random),
    d = new Date();

var hexToRgbConverter = function(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
}

var matrix = new LedMatrix(32, 1, 1, 100);
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

io.on('connection', function(socket) {
  var random = false;

  debug("socket id", socket.client.id, io.engine.clientsCount);

  socket.on('render', function(msg) {
    debug('message: ' + msg.status);
  });

  socket.on('draw', function(coord) {
    var x = coord.x,
        y = coord.y
        color = coord.color;

    debug("coords", coord)

    var rgb;

    if(color === 'rainbow') {
      var t = d.getSeconds();
      var r = Math.floor(simplex.noise3D(x/8, y/8, t/16) * 255);
      var g = Math.floor(simplex.noise3D(x/16, y/16, t/16) * 255);
      var b = Math.floor(simplex.noise3D(x/32, y/32, t/16) * 255);
      rgb = {
        r: r,
        g: g,
        b: b
      } 
    } else {
      rgb = hexToRgbConverter(coord.color)
    }

    if(x < 64 && y < 64) {
      matrix.setPixel(coord.x, coord.y, rgb.r, rgb.g, rgb.b);
      matrix.setPixel(coord.x, coord.y - 1, rgb.r, rgb.g, rgb.b);
      matrix.setPixel(coord.x, coord.y + 1, rgb.r, rgb.g, rgb.b);
      matrix.setPixel(coord.x + 1, coord.y, rgb.r, rgb.g, rgb.b);
    }
  });

  socket.on('reset', function() {
    matrix.clear();
  });

  socket.on('randomize', function() {
    var t = d.getSeconds();

    for (var x = 0; x < 64; x++) {
      for (var y = 0; y < 64; y++) {
        var r = Math.floor(simplex.noise3D(x/8, y/8, t/16) * 255);
        var g = Math.floor(simplex.noise3D(x/8, y/16, t/16) * 255);
        var b = Math.floor(simplex.noise3D(x/16, y/32, t/16) * 255);
        matrix.setPixel(x, y, r, g, b);
      }
    }
  });  

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(port, function () {
  debug('Server listening at port %d', port);
});


r.db('test').table("posts").insert({
    id: 1,
    title: "Lorem ipsum",
    content: "Dolor sit amet"
}).run();


process.on('SIGINT', function () {
  debug('Got SIGINT signal.');
  process.kill(process.pid);
});
