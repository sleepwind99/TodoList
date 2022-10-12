const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/api', {
			target: 'http://localhost:8080', 
			changeOrigin: true,
		})
	);
	app.use(
		createProxyMiddleware('/apirole', {
			target: 'http://localhost:8080', 
			changeOrigin: true,
		})
	);
};