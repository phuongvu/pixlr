var 	express = require('express'),
	eddystone = require('eddystone-beacon');

var options = {
        txPowerLevel: -22,
        tlmCount: 2,
        tlmPeriod: 10
};
var url = 'http://google.com';
eddystone.advertiseUrl(url);

