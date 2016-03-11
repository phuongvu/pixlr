import React from 'react';
import DisplayHelper from '../utils/DisplayHelper';
import { Surface } from 'react-art'
import Grid from './Grid'

class GridBoard extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
    	dimensions: DisplayHelper.getDimensions()
    }
	}
	
	setDisplayDimensions() {
		this.setState({
			dimensions: DisplayHelper.getDimensions()
		})
	}

	componentWillMount() {
		DisplayHelper.subscribeResize(this.setDisplayDimensions);
	}

	componentWillUnmount() {
		DisplayHelper.unsubscribeResize(this.setDisplayDimensions);
	}

	render() {
		let width = this.state.dimensions.width;
		let height = this.state.dimensions.height;

		if (height > width) {
			height = width;
		}

		return (
			<Surface width = { width } height = { height }>
				<Grid width = { width } height = { height } vSize = '64' hSize = '64' />
			</Surface>
		);
	}

}

export default GridBoard;
