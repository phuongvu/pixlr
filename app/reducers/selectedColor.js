import { SELECT_COLOR } from '../constants/ActionTypes'
import { PINK } from '../constants/Colors'

const initialState = PINK

const selectedColor = (state = initialState, action) => {
	switch(action.type) {
		case SELECT_COLOR:
			return action.color
		default:
			return state
	}
}

export default selectedColor
