import { createBrowserRouter } from 'react-router-dom'
import Layout from '../Components/Layouts'
import HomePage from '../Pages/Home'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
		],
	},
])

export default router
