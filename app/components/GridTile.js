'use strict';

var React = require('react')
		, PureRenderMixin = require('react-addons-pure-render-mixin')
		;

import { Path } from 'react-art'
import { Shape } from 'react-art'
import io from 'socket.io-client'

var socket 			= io.connect();

var makeSquarePath = function(size, centre) {
	var path = new Path();
	var point = 0;
	var angle = null;
	var x = null;
	var y = null;

	while (point < 4) {
		angle = 2 * Math.PI / 4 * (point + 0.5);
		x = centre.x + size * Math.cos(angle);
		y = centre.y + size * Math.sin(angle);

		if (point === 0) {
			path.moveTo(x, y);
		}
		else {
			path.lineTo(x, y);
		}

		point = point + 1;
	}

	return path;
};

var GridTile = React.createClass({
	displayName: 'GridTile',
	getInitialState: function() {
		return {
			isSelected: false
		};
	},

	handleTouch: function() {
		this.setState({
			isSelected: true
		});
		console.log("draw", this.props.coords.x, this.props.coords.y, this.props.color);
		socket.emit('draw', {x: this.props.coords.x, y: this.props.coords.y, color: this.props.color});
	},

	render: function() {
		var color = this.state.isSelected ? '#' + this.props.color : '#c9c9c9';

		// TODO - this could be optimised, don't need to calculate coords for every hex, just one and then offset.
		var path = makeSquarePath(this.props.size, this.props.centre);
			
		return (
			<Shape d={path} fill={color} opacity='1' onClick={this.handleTouch.bind(null, this)}></Shape>
		);
	}
});

export default GridTile;