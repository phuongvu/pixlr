import { SELECT_COLOR } from '../constants/ActionTypes'
import _ from 'lodash'

const colors = [
  '#f44336'
  ,'#ec407a'
  ,'#ffa726'
  ,'#ffee58'
  ,'#8bc34a'
  ,'#448aff'
  ,'#9c27b0'
]

const initialState = colors[_.random(0, colors.length - 1)]

const selectedColor = (state = initialState, action) => {
  switch(action.type) {
    case SELECT_COLOR:
      return action.color
    default:
      return state
  }
}

export default selectedColor
