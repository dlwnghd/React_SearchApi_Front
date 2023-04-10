import { useSearch } from 'Contexts/searchContext'
import styled from 'styled-components'

function SearchResultList() {
	const search = useSearch()

	if (search.searchResultList === '검색 결과가 없습니다.') {
		return
	}

	return (
		<ResultList>
			{search.searchResultList.length ? (
				<>
					<h1>검색해서 나온 리스트</h1>
					{search.searchResultList.map((result, index) => (
						<p key={index}>{result}</p>
					))}
				</>
			) : (
				<></>
			)}
		</ResultList>
	)
}
export default SearchResultList

const ResultList = styled.div`
	background-color: #bfffb9;
	border: 0.2rem solid gray;
	border-radius: 0.5rem;
	padding: 1rem;
	margin-top: 1rem;
`
