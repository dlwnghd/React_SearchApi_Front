import React from 'react'
import ReactDOM from 'react-dom/client'
import { Axios } from './Apis/@core'
import App from './App'

Axios.defaults.baseURL = process.env.REACT_APP_API_URL

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
