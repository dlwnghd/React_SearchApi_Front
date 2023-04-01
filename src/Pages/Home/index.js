import SearchApi from 'Apis/searchApi'
import { useAuth } from 'Contexts/auth'
import { useEffect } from 'react'
import { useState } from 'react'
import TokenService from 'Repositorys/tokenService'
import styled from 'styled-components'
import SearchList from './Components/SearchList'
import SearchResultList from './Components/SearchResultList'

function HomePage() {
	const auth = useAuth()

	const recentSearchArray = TokenService.getSearchTokens() // 토큰을 이용한 최근검색어 관리

	const [searchInput, setSearchInput] = useState('') // 검색창에 있는 value 관리
	const [searchList, setSearchList] = useState([]) // 검색해서 나온 list관리

	const [searchResultList, setSearchResultList] = useState([]) // 검색해서 나온 list관리

	const [chooseInput, setChooseInput] = useState(-1) // 검색창에서 하이라이트의 대상이 될 인덱스번호를 기억할 state
	const [focusText, setFocusText] = useState('') // Focus된 텍스트

	const [showSearchList, setShowSearchList] = useState(true) // 검색창 활성화 관리

	// 디바운스 적용
	useEffect(() => {
		const handler = setTimeout(() => {
			// 입력창 값이 변경될 때마다 지연 시간 후에 setSearchInput 함수를 실행
			console.log(searchInput)
		}, 300)

		// 이전 타이머를 제거하여 중복 실행되지 않도록 함
		return () => {
			clearTimeout(handler)
		}
	}, [searchInput])

	// 키 입력
	const handleKeyPress = e => {
		// Enter 키 입력
		if (e.key === 'Enter') {
			// 검색중인 경우
			chooseInput >= 0 &&
				searchList.length &&
				setSearchInput(searchList[chooseInput])

			// 검색창이 빈 경우
			chooseInput >= 0 &&
				!searchList.length &&
				setSearchInput(recentSearchArray[chooseInput])

			onSubmitSearch()
			setChooseInput(-1)
			setShowSearchList(false)
			return
		}

		// Backspace 키 입력
		if (e.key === 'Backspace') {
			setChooseInput(-1)
		}

		// ⬆️키 입력
		if (e.key === 'ArrowUp') {
			console.log('키보드 ⬆️ 입력됨!')

			if (chooseInput < 0) {
				return
			}
			setChooseInput(prev => prev - 1)
		}

		// ⬇️키 입력
		if (e.key === 'ArrowDown') {
			console.log('키보드 ⬇️ 입력됨!')

			// 검색중인 경우
			if (searchList.length) {
				if (chooseInput > searchList.length - 2) {
					setChooseInput(0)
				} else {
					setChooseInput(prev => prev + 1)
				}
			} else {
				// 검색창이 빈 경우
				if (chooseInput > recentSearchArray.length - 2) {
					setChooseInput(0)
				} else {
					setChooseInput(prev => prev + 1)
				}
			}
		}
		setShowSearchList(true)
	}

	// API에서 Promise형태의 데이터 받아오기
	const getData = async params => {
		try {
			const res = await SearchApi.getSearch(params)
			return res.data
		} catch (err) {
			console.log(err.response.data)
			return err.response.data
		}
	}

	// 검색어 변경 핸들러
	const handleSearchTermChange = e => {
		const key = e.target.value
		setSearchInput(key)
	}

	// 검색어로 데이터 가져오기
	const onSubmitSearch = () => {
		if (focusText == '' && searchInput == '') {
			alert('검색어를 입력해주세요')
			return
		}

		getData(`${focusText || searchInput}`)
			.then(data => {
				setSearchResultList(data)
				setSearchList(data)
			})
			.catch(error => {
				console.log(error)
			})
		auth.search(`${focusText || searchInput}`)
	}

	// 검색어 부분 하이라이트 텍스트로 변경
	useEffect(() => {
		if (searchInput == '') {
			setFocusText(chooseInput >= 0 && recentSearchArray[chooseInput])
			return
		}
		setFocusText(chooseInput >= 0 && searchList[chooseInput])
	}, [chooseInput])

	// console.log('searchInput : ' + searchInput)
	// console.log('focusText : ' + focusText)

	return (
		<div className="App">
			<Wrapper>
				<InputArea
					type="text"
					placeholder="검색어를 입력하세요"
					name="searchInput"
					value={focusText || searchInput}
					onChange={handleSearchTermChange}
					onKeyDown={handleKeyPress}
					autoComplete="off"
				/>
				<SearchList
					searchInput={searchInput}
					setSearchInput={setSearchInput}
					searchList={searchList}
					setSearchList={setSearchList}
					chooseInput={chooseInput}
					recentSearchArray={recentSearchArray}
					showSearchList={showSearchList}
					setSearchResultList={setSearchResultList}
					setShowSearchList={setShowSearchList}
				/>
				{searchResultList && (
					<SearchResultList
						searchResultList={searchResultList}
						chooseInput={chooseInput}
					/>
				)}
			</Wrapper>
		</div>
	)
}

export default HomePage

const Wrapper = styled.div`
	width: 80%;
	margin: 5% auto;
`

const InputArea = styled.input`
	width: 100%;
	border: 1px solid black;
	border-radius: 1rem;
	padding: 1rem;
`
