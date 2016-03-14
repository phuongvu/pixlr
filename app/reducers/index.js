import { combineReducers } from 'redux'
import selectedColor from './selectedColor'
import pixels from './pixels'
import orientation from './orientation'
import clear from './clear'
import word from './word'

const rootReducer = combineReducers({
	selectedColor,
	orientation,
	clear,
	word,
	pixels
})

export default rootReducer
