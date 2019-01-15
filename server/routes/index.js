const controllers = require('../controllers/index')
const querystring = require('querystring');

module.exports = async (req, res) => {
	if (req.method === 'OPTIONS') {
		res.end('ok')
	} else if (/\/v1\/getDraftList\?(id=\w+)/ig.test(req.url)) {
		// 获取草稿列表
		let urlObj = req.url.replace(/\/v1\/getDraftList\?(id=\w+)/ig, '$1')
		urlObj = querystring.parse(urlObj, '&')
		// 将控制层的接口返回
		const resultObj = await controllers( 
			{
				method: req.method,	// 接口请求方法，restfulAPI
				msg: '获取草稿列表',	// 接口描述
				url: req.url.replace(/\/v1\//, ''),	// 请求地址
				data: urlObj	// 请求数据
			}
		)
		res.end(JSON.stringify(resultObj))
	} else if (req.url === '/v1/saveActivity') {
		// 保存活动
		let result = ''
		req.on('data', (chunk) => {
			result += chunk
		})
		req.on('end', async () => {
			// 将控制层的接口返回
			const resultObj = await controllers( 
				{
					method: req.method,	// 接口请求方法，restfulAPI
					msg: '保存活动',	// 接口描述
					url: req.url.replace(/\/v1\//, ''),	// 请求地址
					data: JSON.parse(result)	// 请求数据
				}
			)
			res.end(JSON.stringify(resultObj))
		})
	} else if (req.url === '/v1/publishActivity') {
		// 发布活动
		let result = ''
		req.on('data', (chunk) => {
			result += chunk
		})
		req.on('end', async () => {
			// 将控制层的接口返回
			const resultObj = await controllers( 
				{
					method: req.method,	// 接口请求方法，restfulAPI
					msg: '保存活动',	// 接口描述
					url: req.url.replace(/\/v1\//, ''),	// 请求地址
					data: JSON.parse(result)	// 请求数据
				}
			)
			res.end(JSON.stringify(resultObj))
		})
	}
}