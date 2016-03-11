import { combineReducers } from 'redux'
import colorSelection from './colorSelection'
import pixels from './pixels'

const rootReducer = combineReducers({
	colorSelection,
	pixels
})

export default rootReducer
