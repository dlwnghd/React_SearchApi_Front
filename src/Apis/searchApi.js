import { Axios } from './@core'

const PATH = 'search'

// API에서 Promise형태의 데이터 받아오기
const getData = async params => {
	try {
		const res = await Axios.get(`/${PATH}`, {
			params: { key: params },
		})
		return res.data
	} catch (err) {
		console.log(err.response.data)
		return err.response.data
	}
}
export default getData
