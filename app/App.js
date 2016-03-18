import React, { Component } from 'react'
import OrientationChange from './containers/OrientationChange'
import Clear from './containers/Clear'
import ColorSelector from './containers/ColorSelector'
import HammerWrapper from './components/HammerWrapper'
import Pictionary from './containers/Pictionary'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

export default class App extends Component {

	constructor() {
    super()
  }

	render() {
		return (
			<div className="container-fluid">
				<div className="row title align-center">
					ARTable
				</div>
				<div className="row sketchpad__title align-center">
					Sketchpad
				</div>
				<div className="row">
					<HammerWrapper />
				</div>
				<div className="row color-selector">
					<div className="row color-selector__title align-center">
						Select a color
					</div>
					<div className="row color-selector__pellets align-center">
						<ColorSelector />
					</div>
				</div>
				<div className="row">
					<div className="col-xs-6 col-md-6">
						<Clear />
					</div>
					<div className="col-xs-6 col-md-6">
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

