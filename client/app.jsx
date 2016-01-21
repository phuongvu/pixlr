'use strict';

var React = require('react');
		socket = io.connect(),
		ReactDOM = require('react-dom'),
		ReactCanvas = require('react-canvas');

var App = React.createClass({
	render: function() {
		return <div>test</div>;
	}
});

ReactDOM.render(<App/>, document.getElementById('app'))
