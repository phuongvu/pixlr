import React from 'react'
import { getDimensions, subscribeResize, unsubscribeResize } from '../utils/DisplayHelper'
import { Surface } from 'react-art'
import { connect } from 'react-redux'
import { rotate } from '../actions'
import ReactDOM from 'react-dom'
import { draw } from '../actions'
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
		this.handleDoubleTap = this.handleDoubleTap.bind(this)
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

	handlePress(e) {
		let coord = this.calculateCoord(arguments[0])
		this.socket.emit('press', coord)
	}

	handleDoubleTap(e) {
		var coords = []
		let coord = this.calculateCoord(arguments[0])
		_.times(360, function(r) {
      var x = Math.floor(coord.x + 3*Math.cos(r*Math.PI/180))
      var y = Math.floor(coord.y + 3*Math.sin(r*Math.PI/180))
      coords.push({x: x, y: y})
    })
		this.socket.emit('doubleTap', {color: this.props.selectedColor, coords: coords})
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
			<Hammer onPressUp={this.handlePress}
							onDoubleTap={this.handleDoubleTap}
							options={this.options} 
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
