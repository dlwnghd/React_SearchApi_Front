import { useSearch } from 'Contexts/searchContext'
import styled, { css } from 'styled-components'

function SearchList() {
	const search = useSearch()

	// searchList의 값이 '검색 결과가 없습니다.'일 때
	if (search.searchList === '검색 결과가 없습니다.') {
		return <p>{search.searchList}</p>
	}

	// showSearchList가 false일때
	if (!search.showSearchList) {
		return
	}

	// 최근 검색어 보이기
	if (search.searchInput == '') {
		return (
				<ResultWrapper>
					<div>
						<h4>최근 검색어</h4>
					</div>
					<SplitLine />
					{/* 최근검색어 토큰이 있다면*/}
					{search.get() ? (
						search.get().map((item, index) => (
							<ResultBox
								key={item}
								onMouseDown={e => {
									e.stopPropagation()
									search.onSubmitSearch(item)
								}}
							>
								{index === search.chooseInput ? (
									<h3 style={{ backgroundColor: 'pink' }}>{item}</h3>
								) : (
									<p>{item}</p>
								)}
							</ResultBox>
						))
					) : (
						// 최근 검색어 토큰이 없다면
						<p>최근 검색어가 없습니다.</p>
					)}
				</ResultWrapper>
		)
	}

	// 연관 검색어 보이기
	return (
		<ResultWrapper>
			{search.searchList.map((item, index) => (
				<ResultBox
					key={index}
					isSelected={index === search.chooseInput}
					onMouseDown={e => {
						e.stopPropagation()
						search.onSubmitSearch(item)
					}}
				>
					{item.includes(search.searchInput) ? (
						<p>
							{item.split(search.searchInput)[0]}
							<span style={{ color: '#ff0000' }}>{search.searchInput}</span>
						</p>
					) : (
						<p>{item}</p>
					)}
				</ResultBox>
			))}
		</ResultWrapper>
	)
}
export default SearchList

const ResultWrapper = styled.div`
	padding: 5px 10px;
	margin-top: 1rem;
	border: 0.2rem solid gray;
	border-radius: 0.5rem;
	box-sizing: border-box;
`

const ResultBox = styled.div`
	box-sizing: border-box;
	:hover {
		cursor: pointer;
		background-color: var(--color--ultralight-gray);
		font-weight: bold;
		box-sizing: border-box;
	}

	& > h3,
	& > p {
		font-size: ${({ theme }) => theme.FONT_SIZE.small};
	}

	& p span {
		font-size: ${({ theme }) => theme.FONT_SIZE.small};
	}

	${({ isSelected }) =>
		isSelected &&
		css`
			background-color: pink;
		`}
`

const SplitLine = styled.hr`
	margin: 0.5rem 0;
`
