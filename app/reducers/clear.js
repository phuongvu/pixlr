import { CLEAR } from '../constants/ActionTypes'

const initialState = 0

const clear = (state = initialState, action) => {
	switch(action.type) {
		case CLEAR:
			return state + 1
		default:
			return state
	}
}

export default clear
