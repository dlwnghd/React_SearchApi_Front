import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import TokenService from 'Repositorys/tokenService'

const { createContext } = require('react')

const AuthContext = createContext()

/**  
어디서든 useAuth를 사용하면 AuthContext를 사용할 수 있음
*/
export const useAuth = () => useContext(AuthContext)

function AuthProvider({ children }) {
	const [searchToken, setSearchToken] = useState([])

	useEffect(() => {
		// 만약에 웹 스토리지에 token이 남아 있다면
		const token = TokenService.getToken()
		if (token) {
			setSearchToken([token])
		}
	}, [])

	/**
	 * 검색 : 토큰 생성
	 */
	const search = token => {
		if (searchToken) {
			// console.log(token)
			return TokenService.setToken(token)
		}
		TokenService.setToken(token)
	}

	const get = token => {
		TokenService.getToken(token)
	}

	return (
		<AuthContext.Provider value={{ searchToken, search, get }}>
			{children}
		</AuthContext.Provider>
	)
}
export default AuthProvider
