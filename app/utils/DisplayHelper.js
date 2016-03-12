import _ from 'lodash'
import Events from 'events'

var eventEmitter = new Events.EventEmitter()

const onResize = () => {
	eventEmitter.emit('resize', {
		width: window.innerWidth,
		height: window.innerHeight
	})
}

window.addEventListener('resize', _.debounce(onResize, 200))

export const subscribeResize = (onResize) => {
	eventEmitter.addListener('resize', onResize)
}

export const unsubscribeResize = (onResize) => {
	eventEmitter.removeListener('resize', onResize)
}

export const getDimensions = () => {
	return {
		width: window.innerWidth,
		height: window.innerHeight
	}
}
