import styled from 'styled-components'
import { FlexAlignCSS, MarginAuto } from 'Styles/common'
import HomePage from './Components/Search'

const title = 'Google'

function Home() {
	return (
		<S.HomeSection>
			<h2>
				{title.split('').map((item, idx) => {
					return <span key={idx}>{item}</span>
				})}
			</h2>
			<HomePage />
		</S.HomeSection>
	)
}

export default Home

const HomeSection = styled.section`
	${MarginAuto}
	${FlexAlignCSS}
    margin-top: 32rem;
	flex-direction: column;
	justify-content: center;
	height: auto;

	& > h2 {
		margin-bottom: 2rem;
		letter-spacing: -0.1rem;

		& > span {
			font-size: ${({ theme }) => theme.FONT_SIZE.huge};
		}

		& > span:first-child {
			// 블루
			color: rgb(066, 133, 244);
		}
		& > span:nth-child(2) {
			// 레드
			color: rgb(234, 067, 053);
		}
		& > span:nth-child(3) {
			// 옐로우
			color: rgb(251, 188, 005);
		}
		& > span:nth-child(4) {
			// 블루
			color: rgb(066, 133, 244);
		}
		& > span:nth-child(5) {
			// 그린
			color: rgb(052, 168, 083);
		}
		& > span:last-child {
			// 레드
			color: rgb(234, 067, 053);
		}
	}
`

const S = {
	HomeSection,
}
