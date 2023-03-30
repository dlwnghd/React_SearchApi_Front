const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
	app.use(
		'/search',
		createProxyMiddleware('/search', {
			target: 'http://localhost:8081',
			changeOrigin: true,
		}),
	)
}
