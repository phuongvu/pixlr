import React from 'react'
import { getDimensions, subscribeResize, unsubscribeResize } from '../utils/DisplayHelper'
import { Surface } from 'react-art'
import { connect } from 'react-redux'
import { rotate } from '../actions'
import ReactDOM from 'react-dom'
import { draw } from '../actions'
import io from 'socket.io-client'
import Marker from './Marker'

class Grids extends React.Component {
	constructor() {
		super()
    this.state = {
    	dimensions: getDimensions()
    }
    this.setDisplayDimensions = this.setDisplayDimensions.bind(this)
    this.touchStart = this.touchStart.bind(this)
    this.touchMove = this.touchMove.bind(this)
    this.touchEnd = this.touchEnd.bind(this)
    this.getTouchPos = this.getTouchPos.bind(this)
    this.setMarker = this.setMarker.bind(this)
    this.pixels = []
	}

  setMarker(ctx, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, 50)
    ctx.lineTo(50, 0)
    ctx.closePath()
    ctx.fill()
  }

  draw(ctx, x, y, size, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI*2, true)
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
    this.draw(this.ctx, x, y, this.brushSize, color)
    this.socket.emit('draw', {x: Math.floor(x*64/this.width), y: Math.floor(y*64/this.width), color: color})
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
    this.draw(this.ctx, x, y, this.brushSize, color)
    this.socket.emit('draw', {x: Math.floor(x*64/this.width), y: Math.floor(y*64/this.width), color: color})
    e.preventDefault()
  }

  touchEnd(e) {
    this.props.ontouch(this.pixels);
  }

  getTouchPos(e) {
    if (e.touches) {
      if (e.touches.length === 1) { // Only deal with one finger
        let touch = e.targetTouches[0] // Get the information for finger #1
        let x = touch.clientX - touch.target.offsetLeft
        let y = touch.clientY - touch.target.offsetTop
        switch(this.props.orientation) {
          default:
            return {
              px: x*this.ratio,
              py: y*this.ratio,
              x: x*this.ratio,
              y: y*this.ratio
            }
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
    this.brushSize = 8*this.ratio

    this.socket = io.connect()
    this.socket.onerror = function (error) {
      console.error('There was an un-identified Web Socket error', error)
    }

    //Draw marker
    this.socket.emit('render')
    this.setMarker(this.ctx, '#f44336')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orientation != this.props.orientation) {
      this.socket.emit('rotate', {orientation: nextProps.orientation})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.clear != this.props.clear) {
      this.socket.emit('reset')
      this.ctx.clearRect(0, 0, this.width, this.height)
      this.setMarker(this.ctx, '#f44336')
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

const mapDispatchToProps = (dispatch) => {
  return {
    ontouch: (pixel) => {
      dispatch(draw(pixel))
    }
  }
}

const GridBoard = connect(mapStateToProps, mapDispatchToProps)(Grids)

export default GridBoard;
