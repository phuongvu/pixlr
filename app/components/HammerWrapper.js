import React from 'react'
import { getDimensions, subscribeResize, unsubscribeResize } from '../utils/DisplayHelper'
import { Surface } from 'react-art'
import { connect } from 'react-redux'
import { rotate } from '../actions'
import ReactDOM from 'react-dom'
import { draw } from '../actions'
import Hammer from 'react-hammerjs'
import GridBoard from './GridBoard'

class HammerWrapper extends React.Component {
	constructor(props) {
		super(props)
		this.handlePress = this.handlePress.bind(this)
		this.handleDoubleTap = this.handleDoubleTap.bind(this)
		this.handleSwipe = this.handleSwipe.bind(this)
		this.calculateCoord = this.calculateCoord.bind(this)
		this.socket = props.socket
		console.log("props", props.socket, this.socket);
	}

	calculateCoord(p) {
		let ratio = p.target.width/p.target.offsetWidth
		return {
			x: (p.center.x - p.target.offsetLeft)*ratio*64/p.target.width,
			y: (p.center.y - p.target.offsetTop)*ratio*64/p.target.width
		}
	}

	handlePress(e) {
		let coord = this.calculateCoord(arguments[0])
		this.socket.emit('press', coord)
	}

	handleDoubleTap(e) {
		let coord = this.calculateCoord(arguments[0])
		this.socket.emit('doubleTap', coord)
	}

	handleSwipe(e) {
		this.socket.emit('swipe', {deltaX: arguments[0].deltaX, deltaY: arguments[0].deltaY})
	}

	componentDidMount(props) {
    this.socket.onerror = function (error) {
      console.error('There was an un-identified Web Socket error', error)
    }

		this.options = {
    	touchAction:true,
    	recognizers: {
    		press: {
    			time: 1500
    		}
    	}
		}
	}

	render() {
		return (
			<Hammer onPressUp={this.handlePress}
							onSwipe={this.handleSwipe}
							onDoubleTap={this.handleDoubleTap}
							options={this.options} 
							vertical={true} >
				<GridBoard socket={ this.socket } />
			</Hammer>
		)
	}
}

export default HammerWrapper
