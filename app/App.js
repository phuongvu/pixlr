'use strict';

import React, { Component } from 'react';
import ReactArt from 'react-art';
import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import io from 'socket.io-client';
import GridBoard from './components/GridBoard';

var socket 			= io.connect();

//Inject tap event
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

socket.onerror = function (error) {
  console.error('There was an un-identified Web Socket error', error);
};

export default class App extends Component {
	
	reset() {
		socket.emit('reset', {data: 0});
	};

	randomize() {
		socket.emit('randomize', {data: 0});
	};

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
						<div id="grid-container">
							<GridBoard />
						</div>
				</div>
				<div className="row">
					<Button bsStyle="danger" bsSize="small" onTouchTap={this.reset}>Reset</Button>
					<Button bsStyle="success" bsSize="small" onTouchTap={this.randomize}>Randomize</Button>
				</div>
			</div>
		);
	}
};

