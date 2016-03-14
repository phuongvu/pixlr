import React from 'react'
import { connect } from 'react-redux'
import { words } from '../actions'
import PictionaryWords from '../components/PictionaryWords'

const mappStateToProps = (state) => {
	return {
		word: state.word
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onclick: () => {
			dispatch(words())
		}
	}
}

const Pictionary = connect(mappStateToProps, mapDispatchToProps)(PictionaryWords)

export default Pictionary
