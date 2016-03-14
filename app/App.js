'use strict';

import React, { Component } from 'react'
import ReactArt from 'react-art'
import _ from 'lodash'
import io from 'socket.io-client'
import ReactDOM from 'react-dom'

import AppBarMenu from './components/AppBarMenu'

import RaisedButton from 'material-ui/lib/raised-button'
import OrientationChange from './containers/OrientationChange'
import Clear from './containers/Clear'
import ColorSelector from './containers/ColorSelector'
import GridBoard from './components/GridBoard'

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
	
	reset() {
		socket.emit('reset', {data: 0})
	}

	randomize() {
		socket.emit('randomize', {data: 0})
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row title align-center">
					ARTable
				</div>
				<div className="row sketchpad__title align-center">
					Sketch pad
				</div>
				<div className="row">
					<GridBoard />
				</div>
				<div className="row color-selector">
					<div className="row color-selector__title align-center">
						Select a color
					</div>
					<div className="row color-selector__pellets align-center">
						<ColorSelector />
					</div>
				</div>
				<div className="row">
					<div className="col-xs-6 col-md-6">
						<Clear />
					</div>
					<div className="col-xs-6 col-md-6">
						<OrientationChange />
					</div>
				</div>
			</div>
		)
	}
}

