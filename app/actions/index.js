import * as types from '../constants/ActionTypes'

let nextActionId = 0

export const draw = (pixels) => {
	return { 
		id: nextActionId++,
		type: types.DRAW,
		pixels
	}
}

export const selectColor = (color) => {
	return { 
		type: types.SELECT_COLOR, 
		color: color 
	}
}

export const clear = () => {
	return { type: types.CLEAR }
}

export const rotate = () => {
	return { type: types.ROTATE }
}
