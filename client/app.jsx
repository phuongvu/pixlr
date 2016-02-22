'use strict';

var React = require('react'),
		socket = io.connect(),
		ReactDOM = require('react-dom'),
		ReactCanvas = require('react-canvas'),
		Button = require('react-bootstrap').Button;

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var Surface = ReactCanvas.Surface;
socket.onerror = function (error) {
  console.error('There was an un-identified Web Socket error', error);
};

var App = React.createClass({
	componentDidMount: function() {
		document.getElementsByTagName('canvas')[0].addEventListener('click', function(e) {
			socket.emit('draw', {x: Math.floor(e.x/5), y:Math.floor(e.y/5)});
		});
		
		document.getElementsByTagName('canvas')[0].addEventListener('touchstart', function(e) {
			socket.emit('draw', {x: Math.floor(e.touches[0].pageX/5), y:Math.floor(e.touches[0].pageY/5)});
		});

		document.getElementsByTagName('canvas')[0].addEventListener('touchmove', function(e) {
			socket.emit('draw', {x: Math.floor(e.touches[0].pageX/5), y:Math.floor(e.touches[0].pageY/5)});
		});

		document.getElementsByTagName('canvas')[0].addEventListener('touchend', function(e) {
		});		

	},

	reset: function() {
		socket.emit('reset', {data: 0});
	},

	randomize: function() {
		socket.emit('randomize', {data: 0});
	},

	render: function() {
		var surfaceWidth = window.innerWidth;
    var surfaceHeight = window.innerHeight;
    var Gradient = ReactCanvas.Gradient;
    socket.emit('render', {status: 'rendered'});
    document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });

		return (
			<div className="container-fluid">
				<div className="row">
						<Surface width={320} height={320} left={0} top={0} scale={1}>
						</Surface>
				</div>
				<div className="row">
					<button bsStyle="danger" onTouchTap={this.reset}>Reset</button>
					<button bsStyle="success" onTouchTap={this.randomize}>Randomize</button>
				</div>
			</div>
		);
	}
});

ReactDOM.render(<App/>, document.getElementById('app'))
