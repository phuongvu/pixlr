import React from 'react'
import { connect } from 'react-redux'
import { rotate } from '../actions'
import ControllButtons from '../components/ControllButtons'

const mapDispatchToProps = (dispatch) => {
	return {
		onclick: () => {
			dispatch(rotate())
		}
	}
}

const OrientationChange = connect(null, mapDispatchToProps)(ControllButtons)

export default OrientationChange
