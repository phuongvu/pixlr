import React from 'react'
import { connect } from 'react-redux'
import { rotate } from '../actions'
import { RotateButton } from '../components/ControllButtons'

const mapDispatchToProps = (dispatch) => {
	return {
		onclick: () => {
			dispatch(rotate())
		}
	}
}

const OrientationChange = connect(null, mapDispatchToProps)(RotateButton)

export default OrientationChange
