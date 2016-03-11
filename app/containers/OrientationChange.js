import React from 'react'
import { connect } from 'react-redux'
import { rotate } from '../actions'
import ControllButtons from '../components/ControllButtons'

const mapStateToProps = (state) => {
  return { 
  	orientation: state.orientation
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onClick: () => {
			dispatch(rotate())
		}
	}
}

const OrientationChange = connect(mapStateToProps, mapDispatchToProps)(ControllButtons)

export default OrientationChange
