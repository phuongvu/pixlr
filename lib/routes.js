'use strict';

var debug = require('debug')('admin:routes')
  , sketches = require('./sketch.js')
  ;

module.exports = {
  sketches: {
    
  }
};

function success(res) {
  return function(data) {
    res.send(200, data);
  };
}

function fail(res) {
  return function(err) {
    res.send(400, err);
  };
}
