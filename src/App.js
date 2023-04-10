import { ThemeProvider } from 'styled-components'
import GlobalStyles from './Styles/global'
import theme from './Styles/theme'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/routing'
import SearchProvider from 'Contexts/searchContext'

function App() {
	return (
		<ThemeProvider theme={theme}>
			<SearchProvider>
				<GlobalStyles />
				<RouterProvider router={router} />
			</SearchProvider>
		</ThemeProvider>
	)
}

export default App
