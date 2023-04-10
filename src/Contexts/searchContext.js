import getData from 'Apis/searchApi'
import { useContext, createContext } from 'react'
import { useState } from 'react'
import TokenService from 'Repositorys/tokenService'

const SearchContext = createContext()

/**  
어디서든 useSearch를 사용하면 SearchContext를 사용할 수 있음
*/
export const useSearch = () => useContext(SearchContext)

function SearchProvider({ children }) {
	const maxSearchList = 5 // 최대 저장할 최근 검색어 갯수

	const [searchInput, setSearchInput] = useState('') // 검색창에 있는 value 관리
	const [searchList, setSearchList] = useState([]) // 연관검색어 list관리
	const [searchResultList, setSearchResultList] = useState([]) // 검색결과 list관리
	const [chooseInput, setChooseInput] = useState(-1) // 검색창에서 하이라이트의 대상이 될 인덱스번호를 기억할 state
	const [focusText, setFocusText] = useState('') // Focus된 텍스트
	const [showSearchList, setShowSearchList] = useState(false) // 검색창 활성화 관리

	/**
	 * 토큰 값 얻기
	 */
	const get = () => {
		return TokenService.getSearchTokens()
	}

	// 검색어로 데이터 가져오기
	function onSubmitSearch(value) {
		if (value == '') {
			alert('검색어를 입력해주세요')
			return
		}

		getData(value)
			.then(data => {
				setSearchResultList(data)
				setSearchList(data.slice(0, maxSearchList))
			})
			.catch(error => {
				console.log(error)
			})
		TokenService.setToken(value)
		setSearchInput(value)
		setShowSearchList(false)
	}

	return (
		<SearchContext.Provider
			value={{
				get,
				searchInput,
				setSearchInput,
				searchList,
				setSearchList,
				searchResultList,
				setSearchResultList,
				chooseInput,
				setChooseInput,
				focusText,
				setFocusText,
				showSearchList,
				setShowSearchList,
				onSubmitSearch,
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}
export default SearchProvider
