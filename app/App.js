'use strict';

import React, { Component } from 'react';
import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import createStore from 'redux';
import io from 'socket.io-client';

var socket 			= io.connect();
var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

socket.onerror = function (error) {
  console.error('There was an un-identified Web Socket error', error);
};


var Grid = React.createClass({
  render: function() {
  		//Get current size of div

  		//Divide into 64-by-64

  		//Draw
      return (<div className="grid"></div>);
}});

export default class App extends Component {
	componentDidMount() {


	};

	reset() {
		socket.emit('reset', {data: 0});
	};

	randomize() {
		socket.emit('randomize', {data: 0});
	};

	render() {
    var size = 64;
		return (
			<div className="container-fluid">
				<div className="row">
						<Grid data={size} />
				</div>
				<div className="row">
					<Button bsStyle="danger" bsSize="small" onTouchTap={this.reset}>Reset</Button>
					<Button bsStyle="success" bsSize="small" onTouchTap={this.randomize}>Randomize</Button>
				</div>
			</div>
		);
	}
};

