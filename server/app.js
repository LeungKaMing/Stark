const http = require('http')
const routes = require('./routes/index')

// 0. 模版引擎写死脚本(第三方cdn资源)
// 1. 根据请求特定url => 将传入的参数datasource注入到模版引擎的window
// 2 react服务端渲染
const server = http.createServer((req, res) => {
	// 解决跨域
	res.setHeader("Access-Control-Allow-Origin","*");
	res.setHeader("Access-Control-Allow-Headers","*");
	// 路由模块统一处理，按mvc架构划分
	if (req.url === '/demo.html') {
		const ssrObj = require('./static/entry/serverEntry')	// react服务端代码用es6需要在这里处理
		const dom = ssrObj.inital(req.url).dom
		const store = ssrObj.inital(req.url).store
		res.setHeader("Content-Type","text/html;charset=utf-8");
		res.end(`
			<!DOCTYPE html>
				<head>
					<title>React & React Router4 SSR</title>
				</head>
				<body>
				<div id="root">${dom}</div>
				window.__PRELOADED_STATE__ = ${JSON.stringify(store)}
				</body>
			</html>
		`);	
	} else {
		// 解决相应数据中文乱码
		res.setHeader("Content-Type","application/json;charset=utf-8");
		routes(req, res)
	}
});
server.listen(1234, () => {
	console.log('开始监听1234端口')
})
