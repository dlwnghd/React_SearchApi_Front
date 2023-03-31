// CORS 에러를 방지하기 위해 Proxy를 추가

const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
	app.use(
		'/search',
		createProxyMiddleware('/search', {
			target: 'http://localhost:8080',
			changeOrigin: true,
		}),
	)
}
