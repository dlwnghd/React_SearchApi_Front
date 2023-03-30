import { ThemeProvider } from 'styled-components'
import GlobalStyles from './Styles/global'
import theme from './Styles/theme'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/routing'
import AuthProvider from 'Contexts/auth'

function App() {
	return (
		<ThemeProvider theme={theme}>
			<AuthProvider>
				<GlobalStyles />
				<RouterProvider router={router} />
			</AuthProvider>
		</ThemeProvider>
	)
}

export default App
