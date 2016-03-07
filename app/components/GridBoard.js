'use strict';

import React from 'react';
import DisplayHelper from '../utils/DisplayHelper';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Surface } from 'react-art'
import Grid from './Grid'

var GridBoard = React.createClass({
	displayName: 'GridBoard',
	getInitialState: function() {
		return {
			dimensions: DisplayHelper.getDimensions(),
			color: this.props.color
		}
	},
	setDisplayDimensions: function() {
		this.setState({
			dimensions: DisplayHelper.getDimensions()
		});
	},
	componentWillMount: function() {
		DisplayHelper.subscribeResize(this.setDisplayDimensions);
	},
	componentWillUnmount: function() {
		DisplayHelper.unsubscribeResize(this.setDisplayDimensions);
	},
	render: function() {
		var width = this.state.dimensions.width;
		var height = this.state.dimensions.height;

		if (height > width) {
			height = width;
		}

		console.log("grid board color", this.props.color);

		return (
			<Surface width = { width } height = { height }>
				<Grid width = { width } height = { height } vSize = '64' hSize = '64' />
			</Surface>
		);
	}

});

export default GridBoard;
