import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

function Layout() {
	return (
		<S.Wrapper>
			<Outlet />
		</S.Wrapper>
	)
}

export default Layout

const Wrapper = styled.div`
	overflow: hidden;
`
const S = {
	Wrapper,
}
