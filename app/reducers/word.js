import { WORD } from '../constants/ActionTypes'
import _ from 'lodash'
import { words } from '../constants/Words'

const getRandomIntInclusive = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomWord = () => {
	return words[getRandomIntInclusive(0, words.length)]
}

const initialState = randomWord()

const word = (state = initialState, action) => {
	switch (action.type) {
		case WORD:
			return randomWord()
		default:
			return state
	}
}

export default word
