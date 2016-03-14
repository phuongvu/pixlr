import React from 'react';
import { getDimensions, subscribeResize, unsubscribeResize } from '../utils/DisplayHelper';
import { Surface } from 'react-art'
import Marker from './Marker'
import { connect } from 'react-redux'
import { rotate } from '../actions'
import ReactDOM from 'react-dom'
import { draw } from '../actions'

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
    this.pixels = []
	}

  draw(ctx, x, y, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, 10, 0, Math.PI*2, true)
    ctx.closePath()
    ctx.fill()
  }

  touchStart(e) {
    let canvas = ReactDOM.findDOMNode(this)
    let ctx = canvas.getContext('2d')
    let x =  this.getTouchPos(e).x
    let y = this.getTouchPos(e).y
    let px = this.getTouchPos(e).px
    let py = this.getTouchPos(e).py
    let color = this.props.selectedColor

    this.pixels.push({x: x, y: y, px: px, py: py, color: color, timestamp: Date.now()})
    this.draw(ctx, x, y, color)
    e.preventDefault()
  }

  touchMove(e) {
    let canvas = ReactDOM.findDOMNode(this)
    let ctx = canvas.getContext('2d')
    //Mapped coords
    let x =  this.getTouchPos(e).x
    let y = this.getTouchPos(e).y
    let px = this.getTouchPos(e).px
    let py = this.getTouchPos(e).py
    let color = this.props.selectedColor

    this.pixels.push({x: x, y: y, px: px, py: py, color: color, timestamp: Date.now()})    
    this.draw(ctx, x, y, color)
    e.preventDefault()
  }

  touchEnd(e) {
    this.props.ontouch(this.pixels);
  }

  getTouchPos(e) {
    let canvas = ReactDOM.findDOMNode(this)
    if (e.touches) {
      if (e.touches.length === 1) { // Only deal with one finger
        let touch = e.targetTouches[0] // Get the information for finger #1
        let x = touch.clientX - touch.target.offsetLeft
        let y = touch.clientY - touch.target.offsetTop
        switch(this.props.orientation) {
          case 1:
            return {
              px: x*3,
              py: y*3,
              x: (canvas.width/3 - y)*3,
              y: x*3
            }
          case 2:
            return {
              px: x*3,
              py: y*3,
              x: (canvas.width/3 - x)*3,
              y: (canvas.width/3 - y)*3
            }
          case 3:
            return {
              px: x*3,
              py: y*3,
              x: y*3,
              y: (canvas.width/3 - x)*3
            }
          default:
            return {
              px: x*3,
              py: y*3,
              x: x*3,
              y: y*3
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
    let canvas = ReactDOM.findDOMNode(this)
    canvas.addEventListener('touchstart', this.touchStart, false);
    canvas.addEventListener('touchmove', this.touchMove, false);
    canvas.addEventListener('touchend', this.touchEnd, false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orientation != this.props.orientation) {
      let canvas = ReactDOM.findDOMNode(this)
      let ctx = canvas.getContext('2d')
      ctx.translate(canvas.width/2, canvas.height/2)
      ctx.rotate(-90*Math.PI/180)
      ctx.translate(-canvas.width/2, -canvas.height/2)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
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
    selectedColor: state.selectedColor
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
