import styled from 'styled-components'

function Footer() {
	return (
		<S.FooterSection>
			<>구글짱</>
		</S.FooterSection>
	)
}

export default Footer

const FooterSection = styled.footer`
	width: 100%;
	height: 24rem;
	background: var(--color--ultralight-gray);
	text-align: center;
`

const S = {
	FooterSection,
}
