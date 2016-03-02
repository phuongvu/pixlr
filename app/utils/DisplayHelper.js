'use strict';

var _ = require('lodash')
	, Events = require('events')
	;

var eventEmitter = new Events.EventEmitter();

function onResize() {
	eventEmitter.emit('resize', {
		width: window.innerWidth,
		height: window.innerHeight
	});
}

window.addEventListener('resize', _.debounce(onResize, 200));

function	subscribeResize(onResize) {
	eventEmitter.addListener('resize', onResize);
};

function	unsubscribeResize(onResize) {
	eventEmitter.removeListener('resize', onResize);
};

function getDimensions() {
	return {
		width: window.innerWidth,
		height: window.innerHeight
	};
};

module.exports = {
	getDimensions:	getDimensions,
	unsubscribeResize: unsubscribeResize,
	subscribeResize: subscribeResize
};
