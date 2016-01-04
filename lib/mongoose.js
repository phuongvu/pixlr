'use strict';

var Promise = require('bluebird')
  , mongoose = Promise.promisifyAll(require('mongoose'))
  , debug = require('debug')('admin:mongoose');

var mongoURI = process.env.MONGOHQ_URL || 'mongodb://localhost:27017/pixlr';
var opts = { mongos: true };
debug('using mongoose ' + mongoURI);

module.exports = {
  connect: function() {
    return mongoose.connectAsync(mongoURI, opts);
  }
};
