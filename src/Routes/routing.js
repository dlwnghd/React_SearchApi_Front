import Home from 'Pages/Home'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../Components/Layouts'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
		],
	},
])

export default router
