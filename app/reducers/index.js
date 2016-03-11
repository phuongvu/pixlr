import { combineReducers } from 'redux'
import selectedColor from './selectedColor'
import pixels from './pixels'
import orientation from './orientation'

const rootReducer = combineReducers({
	selectedColor,
	orientation,
	pixels
})

export default rootReducer
