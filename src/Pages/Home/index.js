import SearchApi from 'Apis/searchApi'
import { useAuth } from 'Contexts/auth'
import useInput from 'Hooks/useInput'
import { useState } from 'react'
import TokenService from 'Repositorys/tokenService'
import styled from 'styled-components'
import SearchList from './Components/SearchList'
import SearchResultList from './Components/SearchResultList'

function HomePage() {
	const auth = useAuth()
	const recentSearchArray = TokenService.getSearchTokens() // 토큰을 이용한 최근검색어 관리

	const [searchList, setSearchList] = useState([]) // 검색해서 나온 list관리
	const [searchResultList, setSearchResultList] = useState([]) // 검색해서 나온 list관리
	const [searchInput, setSearchInput] = useInput('') // 검색창에 있는 value 관리
	const [chooseInput, setChooseInput] = useState(-1) // 검색창에서 하이라이트의 대상이 될 인덱스번호를 기억할 state

	// 키 입력
	const handleKeyPress = e => {
		// Enter 키 입력
		if (e.key === 'Enter') {
			onSubmitSearch()
		} else if (e.key === 'ArrowUp') {
			// ⬆️키 입력
			console.log('키보드 ⬆️ 입력됨!')

			if (chooseInput < 0) {
				return
			}
			setChooseInput(prev => prev - 1)
		} else if (e.key === 'ArrowDown') {
			// ⬇️키 입력
			console.log('키보드 ⬇️ 입력됨!')

			// 검색중인 경우
			if (searchList.length) {
				if (chooseInput > searchList.length - 2) {
					return setChooseInput(0)
				}
				console.log(chooseInput)
				setChooseInput(prev => prev + 1)
			} else {
				// 검색창이 빈 경우
				if (chooseInput > recentSearchArray.length - 2) {
					return setChooseInput(0)
				}
				console.log(chooseInput)
				setChooseInput(prev => prev + 1)
			}
		} else {
			console.log(e.key)
			return setChooseInput(-1)
		}
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

	// 검색어로 검색
	const onSubmitSearch = () => {
		if (searchInput == '') {
			alert('검색어를 입력해주세요')
			return
		}
		getData(`${searchInput}`)
			.then(data => {
				setSearchResultList(data)
				setSearchList([])
			})
			.catch(error => {
				console.log(error)
			})
		auth.search(searchInput)
	}

	return (
		<div className="App">
			<Wrapper>
				<InputArea
					type="text"
					placeholder="검색어 입력"
					name="searchInput"
					onChange={setSearchInput}
					onKeyDown={handleKeyPress}
					autoComplete="off"
				/>
				<SearchList
					searchInput={searchInput}
					searchList={searchList}
					setSearchList={setSearchList}
					chooseInput={chooseInput}
					recentSearchArray={recentSearchArray}
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
	padding-left: 1rem;
`
