import React from 'react'
import { connect } from 'react-redux'
import { selectColor } from '../actions'
import ColorPellets from '../components/ColorPellets'


const mapStateToProps = (state) => {
	console.log("state", state);
  return { 
  	selectedColor: state.colorSelection.selectedColor
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onClick: (color) => {
			dispatch(selectColor(color))
		}
	}
}

const ColorSelector = connect(mapStateToProps, mapDispatchToProps)(ColorPellets)

export default ColorSelector
