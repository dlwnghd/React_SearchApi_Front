import { useSearch } from 'Contexts/searchContext'
import { useEffect } from 'react'
import styled from 'styled-components'
import SearchList from './SearchList'
import SearchResultList from './SearchResultList'
import useDebouncing from 'Hooks/useDebouncing'
import { IoSearchSharp } from 'react-icons/io5'

function HomePage() {
	const search = useSearch()

	const recentSearchArray = search.get() // 토큰을 이용한 최근검색어 관리

	// 디바운스 사용
	// searchInput값이 바뀔 때마다 안에 정의 실행
	useDebouncing(search.searchInput, search.setSearchList)

	// 키 입력
	const handleKeyPress = e => {
		// Enter 키 입력
		if (e.key === 'Enter') {
			// 검색중인 경우
			search.chooseInput >= 0 &&
				search.searchList.length &&
				search.setSearchInput(search.searchList[search.chooseInput])

			// 검색창이 빈 경우
			search.chooseInput >= 0 &&
				!search.searchList.length &&
				search.setSearchInput(recentSearchArray[search.chooseInput])

			search.onSubmitSearch(search.focusText || search.searchInput)
			search.setChooseInput(-1)
			search.setSearchList([])
			search.setShowSearchList(false)
			return
		}

		// Backspace 키 입력
		if (e.key === 'Backspace') {
			search.setChooseInput(-1)
		}

		// ⬆️키 입력
		if (e.key === 'ArrowUp') {
			// console.log('키보드 ⬆️ 입력됨!')

			if (search.chooseInput < 0) {
				return
			}
			search.setChooseInput(prev => prev - 1)
		}

		// ⬇️키 입력
		if (e.key === 'ArrowDown') {
			// console.log('키보드 ⬇️ 입력됨!')

			// 검색결과가 없는 경우
			if (search.searchList == '검색 결과가 없습니다.') return

			// 검색중인 경우
			if (search.searchList.length) {
				if (search.chooseInput > search.searchList.length - 2) {
					search.setChooseInput(0)
				} else {
					search.setChooseInput(prev => prev + 1)
				}
			} else if (recentSearchArray !== null && recentSearchArray.length) {
				// 검색창이 빈 경우
				if (search.chooseInput > recentSearchArray.length - 2) {
					search.setChooseInput(0)
				} else {
					search.setChooseInput(prev => prev + 1)
				}
			}
		}

		// 다른 (한글 혹은 영어)키 입력
		if (e.key === 'Process') {
			search.setChooseInput(-1)
		}

		search.setShowSearchList(true)
	}

	// 검색어 변경 핸들러
	const handleSearchTermChange = e => {
		const key = e.target.value
		search.setSearchInput(key)
	}

	// 검색창 활성화 핸들러
	const handleSearchOn = () => {
		search.setShowSearchList(true)
	}

	// 검색창 비활성화 핸들러
	const handleSearchOff = () => {
		search.setShowSearchList(false)
	}

	// 검색어 부분 하이라이트 텍스트로 변경
	useEffect(() => {
		// 검색어가 비어있다면
		if (search.searchInput == '') {
			search.setFocusText(
				search.chooseInput >= 0 && recentSearchArray[search.chooseInput],
			)
			return
		}
		search.setFocusText(
			search.chooseInput >= 0 && search.searchList[search.chooseInput],
		)
	}, [search.chooseInput])

	return (
		<Wrapper onFocus={handleSearchOn} onBlur={handleSearchOff}>
			<S.InputContainer>
				<IoSearchSharp style={{ fontSize: '2rem', color: 'gray' }} />
				<InputArea
					type="text"
					placeholder="검색어를 입력하세요"
					name="searchInput"
					value={search.focusText || search.searchInput}
					onChange={handleSearchTermChange}
					onKeyDown={handleKeyPress}
					autoComplete="off"
				/>
			</S.InputContainer>
			<SearchList />
			{search.searchResultList.length !== 0 && <SearchResultList />}
		</Wrapper>
	)
}

export default HomePage

const Wrapper = styled.div`
	width: 80%;
`

const InputContainer = styled.div`
	position: relative;

	& > svg {
		position: absolute;
		left: 1.4rem;
		top: 50%;
		transform: translateY(-50%);
	}
`

const InputArea = styled.input`
	width: 100%;
	border: 0.1rem solid var(--color-light-gray);
	border-radius: 3rem;
	height: 6rem;
	padding: 1rem;
	text-indent: 3rem;
	box-sizing: border-box;

	&:hover {
		border: 0.1rem solid var(--color--ultralight-gray);
		box-sizing: border-box;
		box-shadow: 0 0.2rem 0.9rem rgba(0, 0, 0, 0.3);
	}
`

const S = {
	InputContainer,
}
