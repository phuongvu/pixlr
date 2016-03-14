import React, { Component } from 'react'
import AppBarMenu from './components/AppBarMenu'

import OrientationChange from './containers/OrientationChange'
import ColorSelector from './containers/ColorSelector'
import GridBoard from './components/GridBoard'
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
				<div className="row">
					<OrientationChange />
				</div>
				<div className="row">
					<GridBoard />
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
						<RaisedButton style={{margin: 10}} primary={true} onTouchTap={ this.reset } label="Reset" />
					</div>
					<div className="col-xs-6 col-md-6">
						<RaisedButton style={{margin: 10}} secondary={true} onTouchTap={ this.randomize } label="Surprise me!" />
					</div>
				</div>
				<div className="row">
					<Pictionary />
				</div>
			</div>
		)
	}
}

