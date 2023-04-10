import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { FlexAlignCSS } from 'Styles/common'
import Footer from './Footer/Footer'

function Layout() {
	return (
		<S.Wrapper>
			<Outlet />
			<Footer />
		</S.Wrapper>
	)
}

export default Layout

const Wrapper = styled.div`
	${FlexAlignCSS}
	flex-direction:column;
	height: 100vh;
	justify-content: space-between;
`
const S = {
	Wrapper,
}
