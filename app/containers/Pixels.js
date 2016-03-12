import React from 'react'
import { connect } from 'react-redux'
import { rotate } from '../actions'
import GridBoard from '../components/GridBoard'

const mapStateToProps = (state) => {
  return { 
  	orientation: state.orientation,
  	selectedColor: state.selectedColor
  }
}

const Pixels = connect(mapStateToProps)(GridBoard)

export default Pixels
