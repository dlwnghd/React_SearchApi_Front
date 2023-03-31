import React from 'react'
import ReactDOM from 'react-dom/client'
import { Axios } from './Apis/index'
import App from './App'

Axios.defaults.baseURL = '/'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
