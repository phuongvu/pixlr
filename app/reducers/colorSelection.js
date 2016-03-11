import { SELECT_COLOR } from '../constants/ActionTypes'

const initialState = {
	selectedColor: '#ff4081'
}

const colorSelection = (state = initialState, action) => {
	switch(action.type) {
		case SELECT_COLOR:
			let newState = Object.assign({}, state);
			newState.selectedColor = action.color
			return newState
		default:
			return state
	}
}

export default colorSelection
