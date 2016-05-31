'use strict';

var _ = require('lodash')
  , SimplexNoise = require('simplex-noise')
  ;

var simplex = new SimplexNoise(_.random);

var hexToRgbConverter = function(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

var randomRGB = function(x, y, t) {
  var r = Math.floor(simplex.noise3D(x/8, y/8, t/16) * 255);
  var g = Math.floor(simplex.noise3D(x/16, y/16, t/16) * 255);
  var b = Math.floor(simplex.noise3D(x/32, y/32, t/16) * 255);
  return {
    r: r,
    g: g,
    b: b
  } 
};

module.exports = {
  hexToRgbConverter: hexToRgbConverter,
  randomRGB: randomRGB
};
