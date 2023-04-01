import SearchApi from 'Apis/searchApi'
import { useAuth } from 'Contexts/auth'
import { useEffect } from 'react'
import styled from 'styled-components'

const maxSearchList = 5

function SearchList({
	searchInput,
	setSearchInput,
	searchList,
	setSearchList,
	chooseInput,
	recentSearchArray,
	showSearchList,
	setSearchResultList,
	setShowSearchList,
}) {
	const auth = useAuth()

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

	// searchInput값이 바뀔 때마다 안에 정의 실행
	useEffect(() => {
		const handler = setTimeout(() => {
			if (searchInput === '') {
				setSearchList([])
				return
			}
			getData(`${searchInput}`)
				.then(data => {
					if (typeof data !== 'string' && data.length > maxSearchList) {
						return setSearchList(data.slice(0, maxSearchList))
					}
					setSearchList(data)
				})
				.catch(error => {
					console.log(error)
				})
		}, 500)

		return () => {
			clearTimeout(handler)
		}
	}, [searchInput])

	// 클릭으로 데이터 가져오기
	function onClickSearch(value) {
		console.log('클릭됨!')
		getData(value)
			.then(data => {
				setSearchResultList(data)
				setSearchList([])
			})
			.catch(error => {
				console.log(error)
			})
		auth.search(value)
		setSearchInput(value)
		setShowSearchList(false)
	}

	if (searchList == '검색 결과가 없습니다.') {
		return (
			<>
				<p>{searchList}</p>
			</>
		)
	}

	return (
		<div>
			{searchInput == '' ? (
				<>
					<div>
						<span>최근 검색어</span>
					</div>
					{recentSearchArray ? (
						<>
							{recentSearchArray.map((item, index) => (
								<ResultBox key={item} onClick={() => onClickSearch(item)}>
									{index === chooseInput ? (
										<h3 style={{ backgroundColor: 'pink' }}>{item}</h3>
									) : (
										<p>{item}</p>
									)}
								</ResultBox>
							))}
						</>
					) : (
						<>
							<p>최근 검색어가 없습니다.</p>
						</>
					)}
				</>
			) : (
				<>
					{showSearchList && (
						<>
							{searchList.map((item, index) => (
								<ResultBox key={index} onClick={() => onClickSearch(item)}>
									{index === chooseInput ? (
										<h4 style={{ backgroundColor: 'pink' }}>
											{item.includes(searchInput) ? (
												<>
													{item.split(searchInput)[0]}
													<span style={{ color: '#ff0000' }}>
														{searchInput}
													</span>
													{item.split(searchInput)[1]}
												</>
											) : (
												item
											)}
										</h4>
									) : (
										<p>
											{item.includes(searchInput) ? (
												<>
													{item.split(searchInput)[0]}
													<span style={{ color: '#ff0000' }}>
														{searchInput}
													</span>
													{item.split(searchInput)[1]}
												</>
											) : (
												item
											)}
										</p>
									)}
								</ResultBox>
							))}
						</>
					)}
				</>
			)}
		</div>
	)
}
export default SearchList

const ResultBox = styled.div`
	:hover {
		cursor: pointer;
		background-color: pink;
	}
`
