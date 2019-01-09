const http = require('http')
// const querystring = require('querystring');

// 0. 模版引擎写死脚本(第三方cdn资源)
// 1. 根据请求特定url => 将传入的参数datasource注入到模版引擎的window
// 2 react服务端渲染
const server = http.createServer((req, res) => {
	// res.writeHead(200, { 'Content-Type': 'application/x-www-form-urlencoded' });
	res.writeHead(200, {"Access-Control-Allow-Origin": "*"});
	res.writeHead(200, {"Access-Control-Allow-Methods": "*"});
	res.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});
	if (req.url === '/sendServer') {
		let str = ''
		req.on('data', (chunk) => {
			str += chunk
		})
		req.on('end', () => {
			console.log(str, '<<<<<<<<')
		})
		res.end(str)
	}
});
server.listen(1234, () => {
	console.log('开始监听1234端口')
})