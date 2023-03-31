const TOKEN_KEY = 'search_token'

/**
 * 토큰화 모듈
 */
const TokenService = {
	/**
	 * setToken (token 생성)
	 * @ 백엔드에서 토큰을 만들어달라고 요청하기
	 */
	async setToken(searchToken) {
		let tokens = this.getSearchTokens() || []
		// 중복 검색어 제거
		tokens = tokens.filter(token => token !== searchToken)
		// 새 검색어를 맨 앞에 추가
		tokens.unshift(searchToken)
		// 최대 5개 검색어만 저장
		if (tokens.length > 5) {
			tokens.pop()
		}
		localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens))
	},

	// 최근 검색어 가져오기
	getSearchTokens() {
		const tokens = localStorage.getItem(TOKEN_KEY)
		return tokens ? JSON.parse(tokens) : null
	},
	// get (token 가져오기)
	getToken() {
		return localStorage.getItem(TOKEN_KEY)
	},
	// remove (토큰 삭제)
	removeToken() {
		localStorage.removeItem(TOKEN_KEY)
	},
}

export default TokenService
