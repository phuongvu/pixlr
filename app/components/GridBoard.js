import React from 'react';
import { getDimensions, subscribeResize, unsubscribeResize } from '../utils/DisplayHelper';
import { Surface } from 'react-art'
import Grid from './Grid'

class GridBoard extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
    	dimensions: getDimensions(),
    	orientation: props.orientation
    }
	}
	
	setDisplayDimensions(props) {
		this.setState({
			dimensions: getDimensions()
		})
	}

	componentWillMount() {
		subscribeResize(this.setDisplayDimensions)
	}

	componentWillUnmount() {
		unsubscribeResize(this.setDisplayDimensions)
	}

	render() {
		console.log("Called", this.state.orientation)
		let width = this.state.dimensions.width
		let height = this.state.dimensions.height
		let orientation = this.state.orientation

		if (height > width) {
			height = width
		}

		return (
			<Surface width = { width } height = { height } className={'rotate-left-' + orientation}>
				<Grid width = { width } height = { height } vSize = '64' hSize = '64' />
			</Surface>
		)
	}

}

export default GridBoard;
