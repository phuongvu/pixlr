import React from 'react'
import { Surface } from 'react-art'
import { connect } from 'react-redux'
import Hammer from 'react-hammerjs'
import GridBoard from './GridBoard'

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		function( callback ){
			window.setTimeout(callback, 1000 / 60);
		};
})();

class Gestures extends React.Component {
	constructor(props) {
		super(props)
		this.handlePress = this.handlePress.bind(this)
		this.calculateCoord = this.calculateCoord.bind(this)
		this.socket = props.socket
	}

	calculateCoord(p) {
		let ratio = p.target.width/p.target.offsetWidth
		return {
			x: (p.center.x - p.target.offsetLeft)*ratio*64/p.target.width,
			y: (p.center.y - p.target.offsetTop)*ratio*64/p.target.width
		}
	}

	componentDidMount(props) {
		this.socket.onerror = function (error) {
			console.error('There was an un-identified Web Socket error', error)
		}

		this.options = {
			recognizers: {
				press: {
					time: 1500
				}
			}
		}
	}

	render() {
		return (
			<Hammer options={this.options} 
							vertical={true} >
				<GridBoard socket={ this.socket } />
			</Hammer>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		selectedColor: state.selectedColor
	}
}

const HammerWrapper = connect(mapStateToProps)(Gestures)

export default HammerWrapper
