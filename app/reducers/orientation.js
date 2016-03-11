import { ROTATE } from '../constants/ActionTypes'

const initialState = 0

const orientation = (state = initialState, action) => {
	switch(action.type) {
		case ROTATE:
			if (state < 3) {
				return state + 1
			} else {
				return initialState
			}
		default:
			return state
	}
}

export default orientation
