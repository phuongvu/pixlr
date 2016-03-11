import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import configureStore from './store/configureStore'

import './bower_components/bootstrap/dist/css/bootstrap.min.css'
import './css/main.scss'
import 'json!./manifest.json'

const store = configureStore()

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
