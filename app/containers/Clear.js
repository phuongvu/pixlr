import React from 'react'
import { connect } from 'react-redux'
import { clear } from '../actions'
import { ResetButton } from '../components/ControllButtons'

const mapDispatchToProps = (dispatch) => {
	return {
		onclick: () => {
			dispatch(clear())
		}
	}
}

const Clear = connect(null, mapDispatchToProps)(ResetButton)

export default Clear
