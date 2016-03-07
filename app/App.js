'use strict';

import React, { Component } from 'react';
import ReactArt from 'react-art';
import _ from 'lodash';
import io from 'socket.io-client';
import GridBoard from './components/GridBoard';
import AppBarMenu from './components/AppBarMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import ControllButtons from './components/ControllButtons';
import ColorPicker from 'react-color';
import { createStore } from 'redux';
import {connect} from 'react-redux';

var socket = io.connect();

//Inject tap event
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

socket.onerror = function (error) {
  console.error('There was an un-identified Web Socket error', error);
};

export default class App extends Component {

	constructor() {
    super();
    this.state = {
      color: 'F17013',
    };
    this.changeHandle = this.changeHandle.bind(this);
  };

	changeHandle(color) {
		console.log("color", color);
    this.setState({ color: color.hex });
  };
	
	reset() {
		socket.emit('reset', {data: 0});
	};

	randomize() {
		socket.emit('randomize', {data: 0});
	};

	render() {
		console.log("this state color", this.state.color);
		return (
			<div className="container-fluid">
				<div className="row">
					<AppBarMenu />
				</div>
				<div className="row">
					<ControllButtons />
				</div>
				<div className="row">
					<GridBoard color={this.state.color} />
				</div>
				<div className="row color-picker">
					<div className="row">
						<ColorPicker color={this.state.color} type="slider" onChangeComplete={ this.changeHandle } />
					</div>
					<div className="row">
					</div>
				</div>
				<div className="row">
					<div className="col-xs-6 col-md-6">
						<RaisedButton style={{margin: 10}} primary={true} onTouchTap={this.reset} label="Reset" />
					</div>
					<div className="col-xs-6 col-md-6">
						<RaisedButton style={{margin: 10}} secondary={true} onTouchTap={this.randomize} label="Randomize" />
					</div>
				</div>
			</div>
		);
	}
};

