import { SELECT_COLOR } from '../constants/ActionTypes'

const initialState = '#ec407a'

const selectedColor = (state = initialState, action) => {
	switch(action.type) {
		case SELECT_COLOR:
			return action.color
		default:
			return state
	}
}

export default selectedColor
