'use strict';

import React, { Component } from 'react'
import ReactArt from 'react-art'
import _ from 'lodash'
import io from 'socket.io-client'
import GridBoard from './components/GridBoard'
import AppBarMenu from './components/AppBarMenu'
import RaisedButton from 'material-ui/lib/raised-button'
import ControllButtons from './components/ControllButtons'
import ColorSelector from './containers/ColorSelector'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

var socket = io.connect()

socket.onerror = function (error) {
  console.error('There was an un-identified Web Socket error', error)
};


export default class App extends Component {

	constructor() {
    super()
    this.reset = this.reset.bind(this)
    this.randomize = this.randomize.bind(this)
  }

	changeHandle(color) {
    console.log("color", color);
  }
	
	reset() {
		socket.emit('reset', {data: 0})
	}

	randomize() {
		socket.emit('randomize', {data: 0})
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<AppBarMenu />
				</div>
				<div className="row">
					<ControllButtons />
				</div>
				<div className="row">
					<GridBoard />
				</div>
				<div className="row">
					<div className="row">
					</div>
					<div className="row" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
						<ColorSelector />
					</div>
				</div>
				<div className="row">
					<div className="col-xs-6 col-md-6">
						<RaisedButton style={{margin: 10}} primary={true} onTouchTap={ this.reset } label="Reset" />
					</div>
					<div className="col-xs-6 col-md-6">
						<RaisedButton style={{margin: 10}} secondary={true} onTouchTap={ this.randomize } label="Randomize" />
					</div>
				</div>
			</div>
		)
	}
}

