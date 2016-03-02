'use strict';

var React = require('react')
		, DisplayHelper = require('../utils/DisplayHelper')
		, PureRenderMixin = require('react-addons-pure-render-mixin')
		;

import { Surface } from 'react-art'
import Grid from './Grid'

var GridBoard = React.createClass({
	displayName: 'GridBoard',
	mixins: [PureRenderMixin],
	getInitialState: function() {
		return {
			dimensions: DisplayHelper.getDimensions()
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

		console.log("width", this.state.dimensions.width, this.state.dimensions.height);

		return (
			<Surface width = { width } height = { height }>
				<Grid width = { width } height = { height } vSize = '64' hSize = '64' />
			</Surface>
		);
	}

});

export default GridBoard;
