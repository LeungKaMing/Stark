const querystring = require('querystring');
const controllers = require('../controllers/index')

module.exports = async (req, res) => {
	// 构建统一返回主体
	let responseSubject = {
		code: '',
		msg: '',
		data: {}
	}
	if (req.method === 'OPTIONS') {
		res.end('ok')
	}
	// 获取草稿列表
	if (/\/getDraftList\?(id=\w+)/ig.test(req.url)) {
		const urlObj = req.url.replace(/\/getDraftList\?(id=\w+)/ig, '$1')
		console.log('需要传递给数据库做查询的', querystring.parse(urlObj))
		responseSubject.code = 200
		responseSubject.msg = '获取草稿列表成功'
		responseSubject.data = ''
		console.log('这里要做控制层controllers: ', responseSubject)
		res.end(JSON.stringify(responseSubject))
	}
	// 保存活动
	if (req.url === '/saveActivity') {
		let result = ''
		req.on('data', (chunk) => {
			result += chunk
		})
		req.on('end', () => {
			responseSubject.code = 200
			responseSubject.msg = '保存活动成功'
			responseSubject.data = result
			console.log('这里要做控制层controllers: ', responseSubject)
			res.end(JSON.stringify(responseSubject))
		})
	}
	// 发布活动
	if (req.url === '/publishActivity') {
		let result = ''
		req.on('data', (chunk) => {
			result += chunk
		})
		req.on('end', () => {
			responseSubject.code = 200
			responseSubject.msg = '发布活动成功'
			responseSubject.data = result
			console.log('这里要做控制层controllers: ', responseSubject)
			res.end(JSON.stringify(responseSubject))
		})
	}
}