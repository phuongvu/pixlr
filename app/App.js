import React, { Component } from 'react'
import OrientationChange from './containers/OrientationChange'
import Clear from './containers/Clear'
import ColorSelector from './containers/ColorSelector'
import HammerWrapper from './components/HammerWrapper'
import Pictionary from './containers/Pictionary'
import injectTapEventPlugin from 'react-tap-event-plugin'
import io from 'socket.io-client'

injectTapEventPlugin()

let socket = io.connect();

export default class App extends Component {

	constructor() {
		super()
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row app__header">
					<div className="row">
						<div className="app__logo__container">
							<div className="app__logo">
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<HammerWrapper socket={ socket } />
				</div>
				<div className="row">
					<ColorSelector />
				</div>
				<div className="row control-buttons">
					<div className="control-buttons__clear col-xs-6 col-md-6">
						<Clear />
					</div>
					<div className="control-buttons__rotate col-xs-6 col-md-6">
						<OrientationChange />
					</div>
				</div>
				<div className="row">
					<Pictionary />
				</div>
			</div>
		)
	}
}
