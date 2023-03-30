import styled from "styled-components"

function SearchResultList({ searchResultList }) {
	console.log(searchResultList)
	return (
		<ResultList>
			{searchResultList.map((result, index) => (
				<p key={index}>{result}</p>
			))}
		</ResultList>
	)
}
export default SearchResultList

const ResultList = styled.div`
	background-color: #bfffb9;
`
