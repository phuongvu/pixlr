import { DRAW, CLEAR } from '../constants/ActionTypes'
import _ from 'lodash'

const pixels = (state = [], action) => {
	switch (action.type) {
		case DRAW:
			return _.flatten(_.concat(state, action.pixels))
		case CLEAR:
			return state.filter(pixel => 
				pixel.isOn === true
			)
		default:
			return state
	}
}

export default pixels
