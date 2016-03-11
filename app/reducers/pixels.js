import { DRAW, CLEAR } from '../constants/ActionTypes'

const pixels = (state = [], action) => {
	switch (action.type) {
		case DRAW:
			return [
				{
					id: state.reduce((maxId, pixel) => Math.max(pixel.id, maxId), -1) + 1,
					x: action.pixel.x,
					y: action.pixel.y,
					color: action.pixel.color,
					isOn: true
				},
				...state
			]
		case CLEAR:
			return state.filter(pixel => 
				pixel.isOn === true
			)
		default:
			return state
	}
}

export default pixels
