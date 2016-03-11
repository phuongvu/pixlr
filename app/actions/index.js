import * as types from '../constants/ActionTypes'

let nextActionId = 0

export const draw = (pixel) => {
	return { 
		id: nextActionId++,
		type: types.DRAW,
		x: pixel.x,
		y: pixel.y,
		color: pixel.color 
	};
}

export const selectColor = (color) => {
	console.log("actions color", color);
	return { 
		type: types.SELECT_COLOR, 
		color: color 
	};
}

export const clear = () => {
	return { type: types.CLEAR };
}