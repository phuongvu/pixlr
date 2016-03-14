import React from 'react';
import { getDimensions, subscribeResize, unsubscribeResize } from '../utils/DisplayHelper';
import { Surface } from 'react-art'
import Grid from './Grid'
import GridTile from './GridTile'
import { connect } from 'react-redux'
import { rotate } from '../actions'
import ReactDOM from 'react-dom'
import { draw } from '../actions'
import io from 'socket.io-client'

class Grids extends React.Component {
	constructor() {
		super()
    this.state = {
    	dimensions: getDimensions()
    }
    this.setDisplayDimensions = this.setDisplayDimensions.bind(this)
    this.touchStart = this.touchStart.bind(this)
    this.touchMove = this.touchMove.bind(this)
    this.getTouchPos = this.getTouchPos.bind(this)
	}

  draw(ctx, x, y, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, 10, 0, Math.PI*2, true)
    ctx.closePath()
    ctx.fill()
  }

  touchStart(e) {
    let x =  this.getTouchPos(e).x
    let y = this.getTouchPos(e).y
    let px = this.getTouchPos(e).px
    let py = this.getTouchPos(e).py
    let color = this.props.selectedColor

    this.pixels.push({x: x, y: y, px: px, py: py, color: color, timestamp: Date.now()})
    this.draw(this.ctx, x, y, 5*this.ratio, color)
    this.socket.emit('draw', {x: Math.floor(px*64/this.width), y: Math.floor(py*64/this.width), color: color})
    e.preventDefault()
  }

  touchMove(e) {
    //Mapped coords
    let x =  this.getTouchPos(e).x
    let y = this.getTouchPos(e).y
    let px = this.getTouchPos(e).px
    let py = this.getTouchPos(e).py
    let color = this.props.selectedColor

    this.pixels.push({x: x, y: y, px: px, py: py, color: color, timestamp: Date.now()})    
    this.draw(this.ctx, x, y, 5*this.ratio, color)
    this.socket.emit('draw', {x: Math.floor(px*64/this.width), y: Math.floor(py*64/this.width), color: color})
    e.preventDefault()
  }

  getTouchPos(e) {
    console.log("e", e, e.touches);
    if (e.touches) {
      if (e.touches.length === 1) { // Only deal with one finger
        var touch = e.targetTouches[0] // Get the information for finger #1
        console.log("x, y", touch.pageX - touch.target.offsetLeft, touch.screenY - touch.target.offsetTop);
        return {
          x: (touch.clientX - touch.target.offsetLeft)*3,
          y: (touch.clientY - touch.target.offsetTop)*3
        }
      }
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

  componentDidMount(props) {
    this.canvas = ReactDOM.findDOMNode(this)
    this.ctx = this.canvas.getContext('2d')

    this.canvas.addEventListener('touchstart', this.touchStart, false);
    this.canvas.addEventListener('touchmove', this.touchMove, false);
    this.canvas.addEventListener('touchend', this.touchEnd, false);

    this.width = this.canvas.width
    this.height = this.canvas.height
    this.styleWidth = parseInt(this.canvas.style.width.split(/ /)[0].replace(/[^\d]/g, ''))
    this.styleHeight = parseInt(this.canvas.style.height.split(/ /)[0].replace(/[^\d]/g, ''))
    this.ratio = this.width/this.styleWidth

    this.socket = io.connect()
    this.socket.onerror = function (error) {
      console.error('There was an un-identified Web Socket error', error)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orientation != this.props.orientation) {
      this.ctx.translate(this.width/2, this.height/2)
      this.ctx.rotate(-90*Math.PI/180)
      this.ctx.translate(-this.width/2, -this.height/2)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.clear != this.props.clear) {
      this.socket.emit('reset')
      this.ctx.clearRect(0, 0, this.width, this.height)
    }
    return false
	}

	render() {
		let width = this.state.dimensions.width
		let height = this.state.dimensions.height

		if (height > width) {
			height = width
		}

		const surface = (
		  <Surface width = { width } height = { height } className={'canvas'}>
		  </Surface>
    )
		
    return surface
	}
}

const mapStateToProps = (state) => {
  return {
    orientation: state.orientation,
    selectedColor: state.selectedColor,
    clear: state.clear
  }
}

const GridBoard = connect(mapStateToProps)(Grids)

export default GridBoard;
