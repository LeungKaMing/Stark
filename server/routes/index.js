const controllers = require('../controllers/index')
const querystring = require('querystring');

module.exports = async (req, res) => {
	if (req.method === 'OPTIONS') {
		res.end('ok')
	}
	// 获取草稿列表
	if (/\/v1\/getDraftList\?(id=\w+)/ig.test(req.url)) {
		let urlObj = req.url.replace(/\/v1\/getDraftList\?(id=\w+)/ig, '$1')
		urlObj = querystring.parse(urlObj, '&')
		// 将控制层的接口返回
		let resultObj = await controllers( 
			{
				method: 'GET',	// 接口请求方法，restfulAPI
				msg: '获取草稿列表',	// 接口描述
				url: req.url,	// 请求地址
				data: urlObj	// 请求数据
			}
		)
		res.end(JSON.stringify(resultObj))
	}
	// 保存活动
	if (req.url === '/v1/saveActivity') {
		let result = ''
		req.on('data', (chunk) => {
			result += chunk
		})
		req.on('end', async () => {
			// 将控制层的接口返回
			let resultObj = await controllers( 
				{
					method: 'POST',	// 接口请求方法，restfulAPI
					msg: '保存活动',	// 接口描述
					url: req.url,	// 请求地址
					data: result	// 请求数据
				}
			)
			// res.end(JSON.stringify(responseSubject))
		})
	}
	// 发布活动
	if (req.url === '/v1/publishActivity') {
		let result = ''
		req.on('data', (chunk) => {
			result += chunk
		})
		req.on('end', async () => {
			// 将控制层的接口返回
			let resultObj = await controllers( 
				{
					method: 'POST',	// 接口请求方法，restfulAPI
					msg: '保存活动',	// 接口描述
					url: req.url,	// 请求地址
					data: result	// 请求数据
				}
			)
			// res.end(JSON.stringify(responseSubject))
		})
	}
}