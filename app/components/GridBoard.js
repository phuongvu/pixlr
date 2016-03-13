import React from 'react';
import { getDimensions, subscribeResize, unsubscribeResize } from '../utils/DisplayHelper';
import { Surface } from 'react-art'
import Grid from './Grid'
import GridTile from './GridTile'
import { connect } from 'react-redux'
import { rotate } from '../actions'
import ReactDOM from 'react-dom'

const calculatePixelCoordinates = (baseVector, gridElementSize, axialXCoord, axialYCoord) => {
  return {
    x: baseVector.x + (gridElementSize * 3 / 2 * axialXCoord),
    y: baseVector.y + (gridElementSize * 3 / 2 * axialYCoord)
  };
}

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
    console.log(this);
    let canvas = ReactDOM.findDOMNode(this)
    this.draw(canvas.getContext('2d'), this.getTouchPos(e).x, this.getTouchPos(e).y, this.props.selectedColor)
    e.preventDefault()
  }

  touchMove(e) {
    let canvas = ReactDOM.findDOMNode(this)
    this.draw(canvas.getContext('2d'), this.getTouchPos(e).x, this.getTouchPos(e).y, this.props.selectedColor)
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
    let canvas = ReactDOM.findDOMNode(this)
    console.log("dom", canvas)
    canvas.addEventListener('touchstart', this.touchStart, false);
    canvas.addEventListener('touchmove', this.touchMove, false);
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
			<Surface width = { width } height = { height } className={'rotate-left-' + this.props.orientation}>
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

const GridBoard = connect(mapStateToProps)(Grids)

export default GridBoard;
