const http = require('http')
// const routes = require('./routes/index')

// fe
const App = require('./static/entry/serverEntry')	// react服务端代码用es6需要在这里处理
console.log(App.markup(1), '<<<<<<')

// 0. 模版引擎写死脚本(第三方cdn资源)
// 1. 根据请求特定url => 将传入的参数datasource注入到模版引擎的window
// 2 react服务端渲染
const server = http.createServer((req, res) => {
	// 解决跨域
	res.setHeader("Access-Control-Allow-Origin","*");
	res.setHeader("Access-Control-Allow-Headers","*");
	// 解决相应数据中文乱码
	res.setHeader("Content-Type","application/json;charset=utf-8");
	// 路由模块统一处理，按mvc架构划分
	if (req.url === '/demo.html') {
		res.send(`
			<!DOCTYPE html>
				<head>
					<title>React & React Router4 SSR</title>
					<link rel="stylesheet" href="/css/main.css">
				</head>
				<body>
				<div id="root">${markup}</div>
				</body>
			</html>
		`);	
	} else {
		// routes(req, res)
	}
});
server.listen(1234, () => {
	console.log('开始监听1234端口')
})
