import { Axios } from './index'

const PATH = 'search'

const SearchApi = {
	getSearch(searchInput) {
		return Axios.get(`/${PATH}`, {
			params: { key: searchInput },
		})
	},
}
export default SearchApi
