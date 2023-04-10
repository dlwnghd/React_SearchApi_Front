// 디바운스 모듈화

import getData from 'Apis/searchApi'
import { useEffect } from 'react'

function useDebouncing(callback, depList) {
	const maxSearchList = 5 // 최대 저장할 최근 검색어 갯수

	useEffect(() => {
		const handler = setTimeout(() => {
			if (callback === '') {
				depList([])
				return
			}

			getData(`${callback}`)
				.then(data => {
					if (typeof data !== 'string' && data.length > maxSearchList) {
						return depList(data.slice(0, maxSearchList))
					}

					depList(data)
				})
				.catch(error => {
					console.log(error)
				})
		}, 300)

		return () => clearTimeout(handler)
	}, [callback, depList])
}

export default useDebouncing
