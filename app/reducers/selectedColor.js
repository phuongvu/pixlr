import { SELECT_COLOR } from '../constants/ActionTypes'

const initialState = '#9c27b0'

const selectedColor = (state = initialState, action) => {
	switch(action.type) {
		case SELECT_COLOR:
			return action.color
		default:
			return state
	}
}

export default selectedColor
