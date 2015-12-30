var LedMatrix = require("node-rpi-rgb-led-matrix");

var matrix = new LedMatrix(32, 4, 1, 100, true);
while(1) {
  matrix.setPixel(63, 63, 250, 200, 50);
  matrix.setPixel(0, 0, 0, 255, 100);
  matrix.setPixel(0, 63, 255, 255, 255);
  matrix.setPixel(63, 0, 255, 0, 0);
}
