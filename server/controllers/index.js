// 控制层永远都是做好结构result = {success: false, message: '', data: null, code: ''}
const services = require('../services/index')

module.exports = async (params) => {
	// 构建统一返回主体
	let responseSubject = {
		code: '',
		msg: '',
		data: {}
    }
    // 操作逻辑层
    let resultObj = await services(params)
    // 将逻辑层的结果返回
    responseSubject.code = resultObj.code
    responseSubject.msg = resultObj.msg
    responseSubject.data = resultObj.data
    return responseSubject
}