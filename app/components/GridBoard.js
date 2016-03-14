import React from 'react';
import { getDimensions, subscribeResize, unsubscribeResize } from '../utils/DisplayHelper';
import { Surface } from 'react-art'
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

  draw(ctx, x, y, size, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI*2, true)
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
    this.draw(ctx, x, y, 5*this.ratio, color)
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
    this.draw(ctx, x, y, 5*this.ratio, color)
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
          case 1:
            return {
              px: x*this.ratio,
              py: y*this.ratio,
              x: (this.width/this.ratio - y)*this.ratio,
              y: x*this.ratio
            }
          case 2:
            return {
              px: x*this.ratio,
              py: y*this.ratio,
              x: (this.width/ratio - x)*this.ratio,
              y: (this.width/ratio - y)*this.ratio
            }
          case 3:
            return {
              px: x*this.ratio,
              py: y*this.ratio,
              x: y*this.ratio,
              y: (this.width/this.ratio - x)*this.ratio
            }
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
    let canvas = ReactDOM.findDOMNode(this)
    canvas.addEventListener('touchstart', this.touchStart, false);
    canvas.addEventListener('touchmove', this.touchMove, false);
    canvas.addEventListener('touchend', this.touchEnd, false);

    let width = this.width = canvas.width
    let height = this.height = canvas.height
    let styleWidth = parseInt(canvas.style.width.split(/ /)[0].replace(/[^\d]/g, ''))
    let styleHeight = parseInt(canvas.style.height.split(/ /)[0].replace(/[^\d]/g, ''))
    this.ratio = width/styleWidth
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
